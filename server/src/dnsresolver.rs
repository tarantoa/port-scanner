use std::time::Duration;
use trust_dns_resolver::{
    config::{
        ResolverConfig,
        ResolverOpts,
    },
    Resolver,
};

pub async fn resolves(domain: String) -> bool {
    let dns_resolver = Resolver::new(
        ResolverConfig::default(),
        ResolverOpts {
            timeout: Duration::from_secs(4),
            ..Default::default()
        },
    )
    .expect("error building dns client");

    dns_resolver
        .lookup_ip(domain)
        .is_ok()
}