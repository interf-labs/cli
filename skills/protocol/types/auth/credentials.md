# auth.credentials — API Keys, Service Accounts & Certificates

## auth.api-credentials

**Matches:** "API key for our service", "client ID and secret", "provision credentials", "API access token", "generate an API key"

Enterprise needs to generate and provision API credentials that the vendor service uses to authenticate. This is the vendor's service connecting to enterprise systems, not users logging in.

**Typical ready criteria:** "Our service authenticates and completes a round-trip API call using the provisioned credentials"

## auth.service-account

**Matches:** "service account", "machine-to-machine auth", "automated access", "bot account with permissions", "system user"

Enterprise needs to create a service account with specific permissions for the vendor's automated processes. Common for background jobs, data pipelines, and scheduled operations.

**Typical ready criteria:** "Our service can authenticate as the service account and perform all required operations"

## auth.certificate

**Matches:** "mTLS", "client certificate", "certificate-based auth", "PKI setup", "mutual TLS"

Enterprise needs to provision or exchange certificates for mutual TLS or certificate-based authentication. Common in highly regulated industries (banking, healthcare, government).

**Typical ready criteria:** "Mutual TLS handshake succeeds between our service and your endpoint using the provisioned certificates"
