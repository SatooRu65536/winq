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

pub mod dmx_serial;
pub mod error;
pub mod thread;
