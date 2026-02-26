# interf

The open toolkit for agent readiness in enterprise. Check if your AI agent is ready for enterprise deployment in 5 minutes.

Interf helps vendor teams responsible for enterprise deployments extract their agent's dependencies, simulate readiness against enterprise profiles, and produce a deployment contract — all from inside your coding agent.

## Quick Start

Tell your coding agent:

```
use npx interf to create a readiness spec for this agent for Goldman Sachs deployment
```

That's it. Your coding agent will install the skills, scan your codebase, extract an `interf.yaml` manifest, and simulate enterprise readiness — all in one flow.

Works with Claude Code, Codex, Cursor, and Goose.

## What Happens

1. **Scan** — Your coding agent analyzes your codebase and extracts every enterprise dependency: APIs, databases, auth providers, secrets, compliance requirements, and approval workflows.
2. **Manifest** — Dependencies are written to `interf.yaml`, a machine-readable contract between vendor and enterprise.
3. **Simulate** — A flight simulation runs against the target enterprise profile — timelines, stakeholders, risks, blockers, and critical path to production.

## interf.yaml

The manifest declares everything your agent needs from an enterprise to be ready:

```yaml
name: crm-automation-agent
version: 0.1.0
description: Automates CRM data entry and follow-up scheduling

dependencies:
  - type: api
    name: Salesforce API
    description: Read/write contacts and opportunities
    required: true
    config:
      endpoint: https://api.salesforce.com
      auth_type: oauth2
      scopes: [api, refresh_token]

  - type: auth
    name: SSO Integration
    required: true
    config:
      provider: okta
      protocol: saml

  - type: compliance
    name: SOC2 Compliance
    required: true
    config:
      frameworks: [SOC2]
      controls: [data_encryption, audit_logging, access_review]

capabilities:
  - read_contacts
  - write_contacts

risk_level: high
```

### Dependency types

| Type | Purpose |
|---|---|
| `api` | External API endpoints |
| `database` | Database access |
| `auth` | Authentication providers (SSO, OAuth, SAML) |
| `storage` | Cloud/local storage |
| `network` | Network access requirements |
| `secret` | Credentials and secrets |
| `approval` | Stakeholder sign-offs |
| `compliance` | Regulatory frameworks (SOC2, HIPAA, GDPR) |

## CLI Commands

```
interf                  Install skills and show status
interf validate         Validate interf.yaml against the protocol schema
interf install-skill    Reinstall or manage skills
interf login            Authenticate with interf.com (coming soon)
interf publish          Publish manifest to registry (coming soon)
```

## How It Works

Interf installs skills to your coding agent — structured prompts that teach it the Agent Readiness Protocol. No API keys. No network calls. No code execution. The intelligence comes from your coding agent; Interf gives it the domain knowledge.

Skills are installed to agent-specific directories and are automatically available in all projects:

- Claude Code — `~/.claude/skills/`
- Codex — `~/.codex/skills/`
- Cursor — `~/.cursor/skills/`
- Goose — `~/.config/goose/skills/`

## License

MIT — [Interf, Inc.](https://interf.com)
