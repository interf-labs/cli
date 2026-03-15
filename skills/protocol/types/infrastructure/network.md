# infra.network — Network Access & DNS

## infra.network-access

**Matches:** "firewall rules", "allowlist our IPs", "VPN access", "network connectivity", "open port", "whitelist", "private link"

Enterprise needs to configure network access so the vendor's service can reach enterprise systems — firewall rules, IP allowlisting, VPN setup, or private link configuration.

**Typical ready criteria:** "Our service can connect to your systems from our production environment without network errors"

## infra.dns

**Matches:** "custom domain", "DNS records", "CNAME setup", "subdomain configuration"

Enterprise needs to configure DNS records — typically a CNAME or A record pointing a subdomain to the vendor's service.

**Typical ready criteria:** "The configured domain resolves correctly and serves our application"
