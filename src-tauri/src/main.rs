// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

const EXPORT_PATH: &str = "../src/types/bindings.ts";

mod commands;
pub mod modules;

use commands::{dmx_reset, dmx_send, get_projects, get_usb_devices};
use specta_typescript::Typescript;
use tauri_specta::{collect_commands, Builder};

fn main() {
    let builder = Builder::<tauri::Wry>::new().commands(collect_commands![
        get_projects,
        dmx_send,
        dmx_reset,
        get_usb_devices
    ]);

    #[cfg(debug_assertions)]
    builder
        .export(Typescript::default(), EXPORT_PATH)
        .expect("Failed to export typescript bindings");

    winq_lib::run(builder)
}
