# Canonical Dependency Types

Quick-scan index. Read this first to identify which category a dependency belongs to, then follow the link to the category overview for specific types.

## Categories

| Category | Path | Covers |
|---|---|---|
| [integration](./integration/overview.md) | `integration.*` | System access — CRM, ERP, HRIS, email, webhooks, ticketing, analytics |
| [auth](./auth/overview.md) | `auth.*` | Authentication — SSO, API credentials, service accounts, certificates |
| [data](./data/overview.md) | `data.*` | Data — exports, field mapping, samples, PII, real-time feeds |
| [infrastructure](./infrastructure/overview.md) | `infra.*` | Environments — staging/test, network, firewall, compute, DNS |
| [stakeholder](./stakeholder/overview.md) | `stakeholder.*` | People — data team, security, IT, executive sponsor, business owner |
| [process](./process/overview.md) | `process.*` | Approvals — security review, legal, procurement, change management, training |

## Quick Match

| Vendor says... | Category | Canonical |
|---|---|---|
| "access to your CRM" | integration | `integration.crm.api` |
| "SSO for our app" | auth | `auth.sso.saml` |
| "12 months of history" | data | `data.historical-export` |
| "map your custom fields" | data | `data.field-mapping` |
| "test environment" | infrastructure | `infra.test-environment` |
| "someone from data team" | stakeholder | `stakeholder.data-team` |
| "security review" | process | `process.security-review` |
| "legal review / DPA" | process | `process.legal-review` |

## No Match?

Leave `canonical` empty. The contract works with plain English alone. Unmapped dependencies get reviewed and canonical types are added over time by research agents.
