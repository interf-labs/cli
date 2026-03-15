# interf

The universal interface for agent onboarding in enterprise.

## Quick Start

Install the Agent Onboarding Protocol skills:

```bash
npx skills add interf-labs/agent-onboarding-protocol
```

Then tell your coding agent:

```
declare an onboarding contract for this project and preview rollout for BlackRock
```

Works with Claude Code, Codex, Cursor, and Goose.

## interf.yaml

The onboarding contract declares what you need from enterprise:

```yaml
name: acme-crm-automation
version: 0.2.0
description: Automates CRM data entry and follow-up scheduling

requirements:
  - what: Read/write access to your CRM (contacts and opportunities)
    ready: We can create a contact and read an opportunity via API from our staging environment

  - what: SSO endpoint for our service to authenticate your users
    ready: A test user can log into our app via your SSO and see their CRM data

  - what: Someone from your data team to map your custom fields to our schema (~4 hours)
    ready: Field mapping document completed and signed off by both sides

optional:
  - what: Webhook endpoint for real-time update notifications
    ready: We receive a test webhook payload within 5 seconds of a CRM update
```

## CLI

```
interf                  Install all skills to detected coding agents
interf declare          Install declare + protocol skills
interf validate         Validate interf.yaml against the protocol schema
```

The CLI also installs skills for codebases not using `npx skills`.

## Skills

| Skill | Purpose |
|---|---|
| `declare` | Declare an onboarding contract from your codebase |
| `preview` | Preview enterprise rollout against company profiles |
| `protocol` | Agent Onboarding Protocol specification and canonical dependency types |

## License

MIT — [Interf, Inc.](https://interf.com)
