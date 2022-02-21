#[macro_use]
extern crate rocket;

mod crtshentry;
mod dnsresolver;
mod domain;
mod ports;

use crtshentry::CrtShEntry;
use domain::Domain;

#[get("/<domain_name>")]
async fn enumerate_subdomains(domain_name: &str) -> String {
    let client = reqwest::Client::new();
    let endpoint = format!("https://crt.sh/?q=%25.{}&output=json", domain_name);

    let response = client
        .get(endpoint)
        .send()
        .await
        .expect("error retrieving certificate entries");
    let contents = response
        .json::<Vec<CrtShEntry>>()
        .await
        .expect("error reading json response");

    let subdomains = contents
        .into_iter()
        .filter(|entry| !entry.name_value.contains('*'))
        .map(|entry| Domain{ name: entry.name_value.clone() })
        .collect::<Vec<Domain>>();

    serde_json::to_string(&subdomains)
        .expect("error when serializing subdomains")
}

#[get("/<domain>/ports")]
fn find_open_ports(domain: &str) -> String {
    let open_ports = ports::get_open_ports(domain.to_string());
    serde_json::to_string(&open_ports)
        .expect("error serializing ports")
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount(
            "/", 
            routes![
                enumerate_subdomains, 
                find_open_ports
            ]
        )
}