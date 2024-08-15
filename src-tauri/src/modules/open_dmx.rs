//! [![Latest Release](https://img.shields.io/crates/v/open_dmx?style=for-the-badge)](https://crates.io/crates/open_dmx) [![Documentation](https://img.shields.io/docsrs/open_dmx?style=for-the-badge)](https://docs.rs/open_dmx) [![License](https://img.shields.io/crates/l/open_dmx?style=for-the-badge)]()
//!
//! A wrapper around the [**serial**] library to send **DMX data** over a [SerialPort].
//!
//! <br>
//!
//! ## Usage
//!
//! ```rust
//! use open_dmx::DMXSerial;
//!
//! fn main() {
//!    let mut dmx = DMXSerial::open("COM3").unwrap();
//!   dmx.set_channels([255; 512]);
//!   dmx.set_channel(1, 0).unwrap();
//! }
//! ```
//!
//! <br>
//!
//! ## Feature flags
//!
//! - `thread_priority` *(enabled by default)*- Tries to set the [thread] priority of the [SerialPort] to *`MAX`*
//!
//! [**serial**]: https://dcuddeback.github.io/serial-rs/serial/
//! [SerialPort]: https://dcuddeback.github.io/serial-rs/serial_core/trait.SerialPort
//! [thread]: std::thread
//!

use std::sync::Mutex;

use dmx_serial::DMXSerial;
use once_cell::sync::Lazy;

mod dmx_serial;
mod error;
mod thread;

static DMX_INSTANCE: Lazy<Mutex<Option<DMXSerial>>> = Lazy::new(|| Mutex::new(None));

#[tauri::command]
#[specta::specta]
pub fn dmx_start(port_name: &str, values: Vec<u8>) -> Result<(), String> {
    let mut dmx_guard = DMX_INSTANCE.lock().unwrap();

    // DMXSerial インスタンスがまだ生成されていない場合、作成
    if dmx_guard.is_none() {
        let dmx = match DMXSerial::open(port_name) {
            Ok(dmx) => dmx,
            Err(e) => return Err(e.to_string()),
        };
        *dmx_guard = Some(dmx);
    }

    // DMXSerial インスタンスを使用
    let dmx = dmx_guard.as_mut().unwrap();

    // values を &[u8; 512] に拡張
    let ch = match vec_to_array(values) {
        Ok(ch) => ch,
        Err(e) => return Err(e.to_string()),
    };

    dmx.set_channels(ch);

    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn dmx_stop(port_name: &str) -> Result<(), String> {
    let mut dmx_guard = DMX_INSTANCE.lock().unwrap();

    // DMXSerial インスタンスがまだ生成されていない場合、作成
    if dmx_guard.is_none() {
        let dmx = match DMXSerial::open(port_name) {
            Ok(dmx) => dmx,
            Err(e) => return Err(e.to_string()),
        };
        *dmx_guard = Some(dmx);
    }

    // DMXSerial インスタンスを使用
    let dmx = dmx_guard.as_mut().unwrap();

    // values を &[u8; 512] に拡張
    let copied_value = [0; 512];
    // copied_value.copy_from_slice(values);

    dmx.set_channels(copied_value);

    Ok(())
}

fn vec_to_array(vec: Vec<u8>) -> Result<[u8; 512], &'static str> {
    if vec.len() != 512 {
        return Err("Vector must have exactly 512 elements.");
    }

    let mut array = [0u8; 512];
    array.copy_from_slice(&vec);
    Ok(array)
}
