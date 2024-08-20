use super::open_dmx::dmx_serial::DMXSerial;
use once_cell::sync::Lazy;
use std::sync::Mutex;

static DMX_INSTANCE: Lazy<Mutex<Option<DMXSerial>>> = Lazy::new(|| Mutex::new(None));

#[tauri::command]
#[specta::specta]
pub fn dmx_send_(port_name: &str, values: Vec<u8>) -> Result<(), String> {
    let mut dmx_guard = DMX_INSTANCE.lock().unwrap();

    // DMXSerial インスタンスがまだ生成されていない場合、作成
    if dmx_guard.is_none() {
        let dmx = DMXSerial::open(port_name).map_err(|e| e.to_string())?;
        *dmx_guard = Some(dmx);
    }

    // DMXSerial インスタンスを使用
    let dmx = dmx_guard.as_mut().unwrap();

    // values を &[u8; 512] に拡張
    let ch = vec_to_array(values).map_err(|e| e.to_string())?;

    dmx.set_channels(ch);

    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn dmx_reset_(port_name: &str) -> Result<(), String> {
    let mut dmx_guard = DMX_INSTANCE.lock().unwrap();

    // DMXSerial インスタンスがまだ生成されていない場合、作成
    if dmx_guard.is_none() {
        let dmx = DMXSerial::open(port_name).map_err(|e| e.to_string())?;
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

pub fn vec_to_array(vec: Vec<u8>) -> Result<[u8; 512], &'static str> {
    if vec.len() != 512 {
        return Err("Vector must have exactly 512 elements.");
    }

    let mut array = [0u8; 512];
    array.copy_from_slice(&vec);
    Ok(array)
}
