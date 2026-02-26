# interf

The Interf CLI — agent readiness protocol toolkit for enterprise environments.

Interf helps AI agent vendors declare what their agents need from enterprises before deployment. Scan your codebase, extract dependencies into an `interf.yaml` manifest, validate it, and simulate enterprise readiness.

## Install

```bash
npx interf
```

This installs Interf skills to your coding agent (Claude Code, Codex, Cursor, Goose) and shows available commands.

## What it does

Running `npx interf` installs skills that teach your coding agent how to:

- **Scan** your codebase and extract an `interf.yaml` manifest — identifying APIs, databases, auth providers, secrets, compliance requirements, and approval workflows
- **Simulate** enterprise deployment readiness — timelines, stakeholders, risks, and blockers for any enterprise profile (Fortune 500, Series B, etc.)

## Commands

```
interf                  Install skills and show status
interf validate         Validate interf.yaml against the protocol schema
interf install-skill    Reinstall or manage skills
interf login            Authenticate with interf.com (coming soon)
interf publish          Publish manifest to registry (coming soon)
interf simulate         Cloud simulation (coming soon)
```

## Usage

After running `npx interf`, tell your coding agent:

> "use interf to extract dependencies for Nike deployment"

The agent will scan your codebase, create an `interf.yaml`, and optionally simulate what enterprise deployment looks like — critical path timelines, stakeholder requirements, blockers, and risks.

## interf.yaml

The manifest declares everything your agent needs from an enterprise:

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

## Skills

Interf bundles three skills for coding agents:

| Skill | Purpose |
|---|---|
| `interf-scan` | Scan codebase and extract interf.yaml |
| `interf-simulate` | Run Flight Simulation for enterprise profiles |
| `interf-protocol` | Agent Readiness Protocol reference |

Skills are installed to `~/.claude/skills/` (or equivalent for other agents) and are automatically available in all projects.

## Supported coding agents

- Claude Code (`~/.claude/skills/`)
- Codex (`~/.codex/skills/`)
- Cursor (`~/.cursor/skills/`)
- Goose (`~/.config/goose/skills/`)

Agents are auto-detected. Skills are installed to all detected agents.

## License

MIT — [Interf, Inc.](https://interf.com)
