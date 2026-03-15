# auth — Authentication & Identity

Vendor needs enterprise to set up authentication or provision credentials. Match when vendor says "SSO", "sign-on", "authenticate", "credentials", "API key", "service account".

## Types

| Canonical | One-liner | Detail |
|---|---|---|
| `auth.sso.saml` | SAML-based SSO integration | [sso.md](./sso.md) |
| `auth.sso.oidc` | OpenID Connect SSO | [sso.md](./sso.md) |
| `auth.api-credentials` | API key or client credentials for vendor service | [credentials.md](./credentials.md) |
| `auth.service-account` | Service account with specific permissions | [credentials.md](./credentials.md) |
| `auth.certificate` | mTLS or certificate-based authentication | [credentials.md](./credentials.md) |
