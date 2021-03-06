#[macro_use]
extern crate rocket;

mod crtshentry;
mod domain;
mod ports;

use crtshentry::CrtShEntry;
use domain::Domain;
use rocket::http::Header;
use rocket::{Request, Response};
use rocket::fairing::{Fairing, Info, Kind};
use std::collections::HashSet;

pub struct CORS;

#[rocket::async_trait]
impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Attaching CORS headers to responses",
            kind: Kind::Response
        }
    }

    async fn on_response<'r>(&self, _request: &'r Request<'_>, response: &mut Response<'r>) {
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new("Access-Control-Allow-Methods", "POST, GET, PATCH, OPTIONS"));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}

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

    let unique_subdomains = contents
        .into_iter()
        .map(|entry| entry.name_value)
        .map(|domain| domain
            .split("\n")
            .map(String::from)
            .collect::<HashSet<String>>())
        .flatten()
        .filter(|domain| !domain.contains('*'))
        .collect::<HashSet<String>>();

    let unique_subdomains = unique_subdomains
        .into_iter()
        .collect::<Vec<String>>();

    let subdomains = (0..unique_subdomains.len())
        .map(|i| (unique_subdomains[i].clone(), i))
        .map(|(domain, id)| Domain { name: domain, uuid: id })
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
        .attach(CORS)
        .mount(
            "/", 
            routes![
                enumerate_subdomains, 
                find_open_ports
            ]
        )
}
