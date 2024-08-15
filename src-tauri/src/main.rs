// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod modules;

use modules::open_dmx::{dmx_start, dmx_stop};
use modules::port::find_port;
use specta_typescript::Typescript;
use tauri_specta::{collect_commands, Builder};

fn main() {
    let builder =
        Builder::<tauri::Wry>::new().commands(collect_commands![find_port, dmx_start, dmx_stop]);

    #[cfg(debug_assertions)]
    builder
        .export(Typescript::default(), "../src/types/bindings.ts")
        .expect("Failed to export typescript bindings");

    winq_lib::run(builder)
}
