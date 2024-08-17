use crate::modules::{
    dmx_controller::lib::{dmx_reset_, dmx_send_},
    file::{get_projects_, Project},
    usb::{get_usb_devices_, DeviceInfo},
};

/// プロジェクトを取得します
#[tauri::command]
#[specta::specta]
pub fn get_projects() -> Result<Vec<Project>, String> {
    get_projects_()
}

/// dmx で送信します
#[tauri::command]
#[specta::specta]
pub fn dmx_send(port_name: &str, values: Vec<u8>) -> Result<(), String> {
    dmx_send_(port_name, values)
}

/// dmx で全て0を送信します
#[tauri::command]
#[specta::specta]
pub fn dmx_reset(port_name: &str) -> Result<(), String> {
    dmx_reset_(port_name)
}

/// USBデバイスを取得します
#[tauri::command]
#[specta::specta]
pub fn get_usb_devices() -> Result<Vec<DeviceInfo>, String> {
    get_usb_devices_()
}
