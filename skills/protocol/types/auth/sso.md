# auth.sso — Single Sign-On

## auth.sso.saml

**Matches:** "SSO integration", "SAML setup", "users log in via your identity provider", "single sign-on with your Okta/Azure AD/OneLogin"

Vendor needs enterprise to configure SAML-based SSO so enterprise users can authenticate into the vendor application using their existing identity provider. One of the most common auth dependencies.

**Common enterprise systems:** Okta, Azure AD / Entra ID, OneLogin, Ping Identity, Google Workspace

**Typical ready criteria:** "A test user can log into our application via your SSO and access their data"

## auth.sso.oidc

**Matches:** "OpenID Connect", "OIDC integration", "OAuth2 login flow", "modern SSO"

Vendor needs OpenID Connect based SSO setup. More modern than SAML, common with cloud-native enterprises and newer identity providers.

**Common enterprise systems:** Auth0, Okta, Azure AD / Entra ID, Google Identity Platform

**Typical ready criteria:** "A test user can complete the OIDC login flow and our service receives valid ID and access tokens"
