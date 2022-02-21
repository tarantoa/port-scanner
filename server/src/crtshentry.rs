use serde::{
    Deserialize,
    Serialize
};

#[derive(Debug, Serialize, Deserialize)]
pub struct CrtShEntry {
    pub issuer_ca_id: i64,
    pub issuer_name: String,
    pub common_name: String,
    pub name_value: String,
    pub id: i64,
    pub entry_timestamp: String,
    pub not_before: String,
    pub not_after: String,
    pub serial_number: String,
}