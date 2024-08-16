use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Clone, Serialize, Deserialize, Debug, Type)]
pub struct Project {
    name: String,
    path: String,
}

#[tauri::command]
#[specta::specta]
pub fn get_projects() -> Result<Vec<Project>, String> {
    let mut projects: Vec<Project> = Vec::new();

    // TODO: プロジェクト一覧を取得する処理を実装する
    for i in 1..10 {
        projects.push(Project {
            name: "プロジェクト".to_owned() + &i.to_string(),
            path: "/path/to/project".to_owned() + &i.to_string() + ".yaml",
        });
    }

    Ok(projects)
}
