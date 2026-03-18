# interf

CLI tooling for the [Enterprise Readiness Protocol](https://github.com/interf-labs/enterprise-readiness-protocol) — validate readiness contracts, publish to the Interf registry, and preview rollouts across enterprise profiles.

The protocol itself is available as coding agent skills:

```bash
npx skills add interf-labs/enterprise-readiness-protocol
```

## Commands

| Command | Purpose |
|---|---|
| `npx interf` | Install protocol skills to your coding agents |
| `npx interf validate` | Validate `interf.yaml` against the protocol schema and canonical types |
| `npx interf publish` | Publish readiness contract to the Interf registry *(coming soon)* |
| `npx interf preview` | Preview rollout across enterprise profiles *(coming soon)* |

## When to Use the CLI

The protocol skills (`npx skills add`) teach your coding agent how to draft readiness contracts and preview rollouts — no CLI needed.

The CLI adds:
- **Validation** — check `interf.yaml` against the schema and verify canonical type mappings
- **Publishing** — submit your contract to the Interf registry so enterprises can discover it
- **Preview** — run rollout previews powered by Interf's execution intelligence

## The Readiness Contract

```yaml
name: crm-automation
version: 0.2.0
description: Automates CRM data entry and follow-up scheduling

requirements:
  - what: Read/write access to your CRM (contacts and opportunities)
    ready: We can create a contact and read an opportunity via API from our staging environment

  - what: SSO endpoint for our service to authenticate your users
    ready: A test user can log into our app via your SSO and see their CRM data

optional:
  - what: Webhook endpoint for real-time update notifications
    ready: We receive a test webhook payload within 5 seconds of a CRM update
```

The `ready` field defines what must be true — verifiable acceptance criteria for each enterprise dependency.

## License

MIT — [Interf, Inc.](https://interf.com)
