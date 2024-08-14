use serialport::{available_ports, SerialPortType};

#[tauri::command]
#[specta::specta]
pub fn find_port() -> Vec<String> {
    let ports = match available_ports() {
        Ok(ports) => ports,
        Err(_) => return vec![],
    };

    let usb_tty_ports = ports
        .iter()
        .filter(|p| match &p.port_type {
            SerialPortType::UsbPort(_) => p.port_name.starts_with("/dev/tty"),
            _ => false,
        })
        .collect::<Vec<_>>();

    usb_tty_ports
        .iter()
        .map(|p| p.port_name.clone())
        .collect::<Vec<_>>()
}
