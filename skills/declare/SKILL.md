---
name: declare
description: >
  Declare an interf.yaml onboarding contract for your solution. Scans the codebase
  to extract enterprise dependencies, or helps you write them manually. Use when
  you want to define what your solution needs from enterprise to deliver value.
license: MIT
metadata:
  author: interf
  version: "2.0.0"
---

# Declare Onboarding Contract

Extract or define an `interf.yaml` onboarding contract declaring what this solution needs from enterprise environments.

The contract is plain English. Each dependency is a `what` (what you need) and `ready` (how enterprise knows it's done).

## Process

### Step 1: Understand the Solution

- Read README, package.json / pyproject.toml / go.mod, and key config files
- Identify what the solution does — is it an AI agent, platform, tool, or service?
- Understand what value it delivers to enterprise customers

### Step 2: Extract Dependencies

Scan the codebase for things that depend on the enterprise environment. Think like an FDE: what would you need from the customer before you can go live?

**System access**
- HTTP client calls, SDK imports, API references
- Database connections, ORM configs
- OAuth/SSO/SAML configurations
- Cloud storage references (S3, GCS, Azure Blob)
- Webhook configurations

**Data requirements**
- What data does the solution need to function?
- Historical data for training or analysis?
- Real-time data feeds?
- Custom field mapping needed?

**Human coordination**
- Who at the enterprise needs to be involved?
- Data team for field mapping?
- Security team for review?
- Business owner for validation?
- Executive sponsor?

**Process requirements**
- Security review or assessment?
- Legal/DPA review?
- Change management for affected workflows?
- End-user training?

**Infrastructure**
- Test/staging environments needed?
- Network access or firewall rules?
- Compute resources?

### Step 3: Write the Contract

Write `interf.yaml` to the project root:

```yaml
name: solution-name
version: 0.1.0
description: What the solution does, one line

requirements:
  - what: Plain English — what you need from enterprise
    ready: How enterprise verifies this is done — specific and testable

  - what: Another dependency
    ready: Another verification criteria

optional:
  - what: Something that improves the experience but isn't blocking
    ready: How to verify
```

**Writing good `what` descriptions:**
- Write for a non-technical stakeholder when possible
- Be specific: "Read/write access to your CRM contacts and opportunities" not "CRM access"
- Include scope: "12 months of contact history" not "historical data"
- Include effort estimates for human tasks: "~4 hours of your data team's time"

**Writing good `ready` criteria:**
- Make it verifiable: "We can create a contact via API from our staging environment"
- Include what success looks like: "Extraction accuracy above 95% on sample documents"
- Be specific about who verifies: "Field mapping document signed off by both sides"

### Step 4: Auto-map Canonical Types

For each dependency, check if it matches a known canonical type from the Agent Onboarding Protocol. If confident, add the `canonical` field. If unsure, skip it — the contract works without it.

Reference: load the `protocol` skill for the canonical type reference.

### Step 5: Summarize

Tell the user:
- Total dependencies found (needs vs optional)
- Any dependencies that might be missing — common things FDEs forget:
  - Security review (almost always needed at enterprise)
  - Test environment (hard to validate without one)
  - Data team coordination (custom fields always need mapping)
  - Executive sponsor (rollouts stall without one)
- Next steps: review the contract, then preview rollout with the `preview` skill
