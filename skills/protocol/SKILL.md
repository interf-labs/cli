---
name: agent-onboarding-protocol
description: >
  The Agent Onboarding Protocol specification. Defines the interf.yaml contract
  format for declaring what solutions need from enterprise environments.
  Use as reference when drafting or reviewing onboarding contracts.
user-invocable: false
license: MIT
metadata:
  author: interf
  version: "2.0.0"
---

# Agent Onboarding Protocol

An open standard for declaring what AI-powered solutions need from enterprise environments to deliver value. The onboarding contract makes enterprise dependencies explicit, previewable, and verifiable — so enterprises self-prepare and vendors stop waiting.

**Vendors declare it. Enterprises resolve it. No more mid-flight surprises.**

## Contract Specification

See [spec.md](./spec.md) for:
- The `interf.yaml` schema (`requirements`, `optional`, `what` + `ready`)
- Field definitions and validation rules
- Design principles

## Canonical Dependency Types

Dependencies can be anything in plain English. Canonical types enable deterministic matching across vendors and enterprises.

**Start here:** [types/index.md](./types/index.md) — quick-scan index with match table. Read this first to identify which category applies, then dive into the detail file.

| Category | File | What it covers |
|---|---|---|
| integration | [types/integration.md](./types/integration.md) | CRM, ERP, HRIS, email, webhooks, ticketing, analytics |
| auth | [types/auth.md](./types/auth.md) | SSO (SAML/OIDC), API credentials, service accounts, certificates |
| data | [types/data.md](./types/data.md) | Historical exports, field mapping, sample data, PII, real-time feeds |
| infrastructure | [types/infrastructure.md](./types/infrastructure.md) | Test environments, network/firewall, compute, DNS |
| stakeholder | [types/stakeholder.md](./types/stakeholder.md) | Data team, security, IT admin, executive sponsor, business owner |
| process | [types/process.md](./types/process.md) | Security review, legal/DPA, procurement, change management, training |

No match? Leave `canonical` empty — the contract works with plain English alone.

## Examples

See [examples.md](./examples.md) for realistic contracts across different solution types (CRM automation, document processing, customer support).

## How It Works

1. **Declare** — Vendor teams declare what they need in an `interf.yaml` contract. Use the `declare` skill to extract from a codebase, or write manually.
2. **Deliver** — Contract is sent to enterprise (via Interf platform, email, or however you work today).
3. **Resolve** — Enterprise works through each dependency. Each item has `ready` criteria so there's no ambiguity.
4. **Verify** — When all `requirements` are resolved, the solution is clear to deploy.
