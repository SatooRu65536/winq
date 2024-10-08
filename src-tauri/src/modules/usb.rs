use serde::{Deserialize, Serialize};
use serialport::{available_ports, SerialPortType};
use specta::Type;

#[derive(Clone, Serialize, Deserialize, Debug, Type)]
pub struct DeviceInfo {
    port_name: String,
    product_name: String,
}

#[tauri::command]
#[specta::specta]
pub fn get_usb_devices_() -> Result<Vec<DeviceInfo>, String> {
    let mut usbdevice_list: Vec<DeviceInfo> = Vec::new();

    let ports = available_ports().map_err(|e| e.to_string())?;

    for port in ports {
        if !port.port_name.starts_with("/dev/tty") {
            continue;
        }
        if let SerialPortType::UsbPort(info) = port.port_type {
            usbdevice_list.push(DeviceInfo {
                port_name: port.port_name,
                product_name: info.product.unwrap_or_default(),
            });
        }
    }

    Ok(usbdevice_list)
}
