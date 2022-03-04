use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct Domain {
    pub name: String,
    pub uuid: usize,
}