---
name: interf-protocol
description: >
  The Agent Onboarding Protocol specification. Teaches the interf.yaml schema,
  dependency types, and how to declare what AI agents need from enterprise
  environments to onboard.
---

# Interf Protocol — Agent Onboarding Specification

## Overview

The Agent Onboarding Protocol is an open standard for declaring what AI agents need from enterprise environments to onboard. Requirements are specified in an `interf.yaml` onboarding contract — a machine-readable contract that covers APIs, authentication, compliance, approvals, and every other dependency an agent has on its target environment.

The onboarding contract bridges the gap between "works in dev" and "deployed in production" by making enterprise requirements explicit, previewable, and verifiable.

**Vendors define it. Enterprises resolve it. Agents verify it.**

## interf.yaml Schema

```yaml
name: string           # Agent/tool name
version: string        # Semver
description: string    # What it does

dependencies:
  - type: string       # One of: api, database, auth, storage, network, secret, approval, compliance
    name: string       # Human-readable name
    description: string # What this dependency is for
    required: boolean  # Is this blocking?
    config:            # Type-specific configuration
      # For api: endpoint, method, auth_type, scopes
      # For database: engine, access_level (read/write/admin)
      # For auth: provider, protocol (oauth2/saml/api_key), scopes
      # For storage: type (s3/gcs/local), access_level
      # For network: hosts, ports, protocol
      # For secret: names (list of env vars or vault paths)
      # For approval: approver_role, justification
      # For compliance: frameworks (SOC2/HIPAA/GDPR), controls

capabilities:
  - string             # What the agent can do

risk_level: low | medium | high | critical
```

## Example

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
    description: Enterprise SSO for agent authentication
    required: true
    config:
      provider: okta
      protocol: saml

  - type: secret
    name: API Credentials
    description: Salesforce client credentials
    required: true
    config:
      names: [SF_CLIENT_ID, SF_CLIENT_SECRET, SF_REFRESH_TOKEN]

  - type: compliance
    name: SOC2 Compliance
    description: Required for handling customer PII
    required: true
    config:
      frameworks: [SOC2]
      controls: [data_encryption, audit_logging, access_review]

  - type: approval
    name: Security Review
    description: InfoSec team must approve API access
    required: true
    config:
      approver_role: security_engineer
      justification: Agent accesses customer PII via Salesforce

capabilities:
  - read_contacts
  - write_contacts
  - read_opportunities
  - schedule_followups

risk_level: high
```

## Dependency Types

| Type | Purpose | Config fields |
|---|---|---|
| `api` | External API endpoints | endpoint, method, auth_type, scopes |
| `database` | Database access | engine, access_level (read/write/admin) |
| `auth` | Authentication providers | provider, protocol (oauth2/saml/api_key), scopes |
| `storage` | Cloud/local storage | type (s3/gcs/local), access_level |
| `network` | Network access | hosts, ports, protocol |
| `secret` | Credentials and secrets | names (env vars or vault paths) |
| `approval` | Stakeholder sign-offs | approver_role, justification |
| `compliance` | Regulatory frameworks | frameworks (SOC2/HIPAA/GDPR/PCI-DSS), controls |

## Risk Levels

- **low** — Read-only access, no PII, no external writes
- **medium** — Write access to non-sensitive systems
- **high** — PII access, financial data, or broad write permissions
- **critical** — Healthcare data, payment processing, or admin-level access
