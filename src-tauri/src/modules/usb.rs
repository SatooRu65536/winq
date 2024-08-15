use serde::{Deserialize, Serialize};
use serialport::{available_ports, SerialPortType};

#[derive(Clone, Serialize, Deserialize, Debug, specta::Type)]
pub struct DeviceInfo {
    port_name: String,
    product_name: String,
}

#[tauri::command]
#[specta::specta]
pub fn get_usb_devices() -> Result<Vec<DeviceInfo>, String> {
    let mut usbdevice_list: Vec<DeviceInfo> = Vec::new();

    let ports = match available_ports() {
        Ok(ports) => ports,
        Err(e) => return Err(e.to_string()),
    };

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
