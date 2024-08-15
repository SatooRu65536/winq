use super::error;
use super::error::{DMXChannelValidityError, DMXDisconnectionError};
use super::thread::{ArcRwLock, ReadOnly};
use serialport::SerialPort;
use std::io::Write;
use std::sync::mpsc;
use std::thread;
use std::time;

pub const DMX_CHANNELS: usize = 512;
const TIME_BREAK_TO_DATA: time::Duration = time::Duration::new(0, 136_000);

#[derive(Debug)]
pub struct DMXSerial {
    name: String,
    channels: ArcRwLock<[u8; DMX_CHANNELS]>,
    agent: AgentCommunication<()>,
    is_sync: ArcRwLock<bool>,
    min_time_break_to_break: ArcRwLock<time::Duration>,
}

impl DMXSerial {
    fn check_valid_channel(channel: usize) -> Result<(), error::DMXChannelValidityError> {
        if channel > DMX_CHANNELS {
            return Err(error::DMXChannelValidityError::TooHigh);
        }
        if channel < 1 {
            return Err(error::DMXChannelValidityError::TooLow);
        }
        Ok(())
    }

    pub fn open(port: &str) -> Result<DMXSerial, serialport::Error> {
        let (handler, agent_rx) = mpsc::sync_channel(0);
        let (agent_tx, handler_rec) = mpsc::channel();

        let dmx = DMXSerial {
            name: port.to_string(),
            channels: ArcRwLock::new([0; DMX_CHANNELS]),
            agent: AgentCommunication::new(agent_tx, agent_rx),
            is_sync: ArcRwLock::new(false),
            min_time_break_to_break: ArcRwLock::new(time::Duration::from_micros(22_700)),
        };

        let mut agent = DMXSerialAgent::open(&port, dmx.min_time_break_to_break.read_only())?;
        let channel_view = dmx.channels.read_only();
        let is_sync_view = dmx.is_sync.read_only();
        let _ = thread::spawn(move || loop {
            if is_sync_view.read().unwrap().clone() {
                if handler_rec.recv().is_err() {
                    break;
                }
            }

            let channels = channel_view.read().unwrap().clone();

            if let Err(_) = agent.send_dmx_packet(channels) {
                break;
            }

            if let Err(mpsc::TrySendError::Disconnected(_)) = handler.try_send(()) {
                break;
            }
        });
        Ok(dmx)
    }

    pub fn open_sync(port: &str) -> Result<DMXSerial, serialport::Error> {
        let mut dmx = DMXSerial::open(port)?;
        dmx.set_sync();
        Ok(dmx)
    }

    pub fn reopen(&mut self) -> Result<(), serialport::Error> {
        let channels = self.get_channels();
        let new_dmx = DMXSerial::open(&self.name)?;
        *self = new_dmx;
        self.set_channels(channels);
        Ok(())
    }

    pub fn name(&self) -> &str {
        &self.name
    }

    pub fn set_channel(
        &mut self,
        channel: usize,
        value: u8,
    ) -> Result<(), DMXChannelValidityError> {
        Self::check_valid_channel(channel)?;

        let mut channels = self.channels.write().unwrap();
        channels[channel - 1] = value;
        Ok(())
    }

    pub fn set_channels(&mut self, channels: [u8; DMX_CHANNELS]) {
        *self.channels.write().unwrap() = channels;
    }

    pub fn get_channel(&self, channel: usize) -> Result<u8, DMXChannelValidityError> {
        Self::check_valid_channel(channel)?;

        let channels = self.channels.read().unwrap();
        Ok(channels[channel - 1])
    }

    pub fn get_channels(&self) -> [u8; DMX_CHANNELS] {
        self.channels.read().unwrap().clone()
    }

    pub fn reset_channels(&mut self) {
        self.channels.write().unwrap().fill(0);
    }

    fn wait_for_update(&self) -> Result<(), DMXDisconnectionError> {
        self.agent.rx.recv().map_err(|_| DMXDisconnectionError)?;
        Ok(())
    }

    pub fn update(&mut self) -> Result<(), DMXDisconnectionError> {
        self.update_async()?;
        self.wait_for_update().map_err(|_| DMXDisconnectionError)?;
        Ok(())
    }

    pub fn update_async(&self) -> Result<(), DMXDisconnectionError> {
        self.agent.tx.send(()).map_err(|_| DMXDisconnectionError)?;
        Ok(())
    }

    pub fn set_sync(&mut self) {
        *self.is_sync.write().unwrap() = true;
    }

    pub fn set_async(&mut self) {
        *self.is_sync.write().unwrap() = false;
    }

    pub fn is_sync(&self) -> bool {
        self.is_sync.read().unwrap().clone()
    }

    pub fn is_async(&self) -> bool {
        !self.is_sync()
    }

    pub fn set_packet_time(&mut self, time: time::Duration) {
        self.min_time_break_to_break
            .write()
            .unwrap()
            .clone_from(&time);
    }

    pub fn get_packet_time(&self) -> time::Duration {
        self.min_time_break_to_break.read().unwrap().clone()
    }

    pub fn check_agent(&self) -> Result<(), DMXDisconnectionError> {
        if let Err(mpsc::TryRecvError::Disconnected) = self.agent.rx.try_recv() {
            return Err(DMXDisconnectionError);
        }
        Ok(())
    }
}

#[derive(Debug)]
struct AgentCommunication<T> {
    pub tx: mpsc::Sender<T>,
    pub rx: mpsc::Receiver<T>,
}

impl<T> AgentCommunication<T> {
    pub fn new(tx: mpsc::Sender<T>, rx: mpsc::Receiver<T>) -> AgentCommunication<T> {
        AgentCommunication { tx, rx }
    }
}

struct DMXSerialAgent {
    port: Box<dyn SerialPort>,
    min_b2b: ReadOnly<time::Duration>,
}

impl DMXSerialAgent {
    pub fn open(
        port: &str,
        min_b2b: ReadOnly<time::Duration>,
    ) -> Result<DMXSerialAgent, serialport::Error> {
        let port = serialport::new(port, 250000)
            .data_bits(serialport::DataBits::Eight)
            .stop_bits(serialport::StopBits::Two)
            .parity(serialport::Parity::None)
            .flow_control(serialport::FlowControl::None)
            .open()?;
        let dmx = DMXSerialAgent { port, min_b2b };
        Ok(dmx)
    }

    fn send_data(&mut self, data: &[u8]) -> serialport::Result<()> {
        self.port.write(data)?;
        Ok(())
    }

    pub fn send_dmx_packet(&mut self, channels: [u8; DMX_CHANNELS]) -> serialport::Result<()> {
        let start = time::Instant::now();
        self.port.set_break()?;
        thread::sleep(TIME_BREAK_TO_DATA);
        self.port.clear_break()?;
        let mut prefixed_data = [0; 513];
        prefixed_data[1..].copy_from_slice(&channels);
        self.send_data(&prefixed_data)?;

        thread::sleep(self.min_b2b.read().unwrap().saturating_sub(start.elapsed()));

        Ok(())
    }
}
