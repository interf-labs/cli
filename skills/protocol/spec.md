# interf.yaml Specification

## Schema

```yaml
# Required
name: string              # Solution/agent name (kebab-case)
version: string           # Semver (0.1.0, 1.0.0, etc.)
description: string       # What it does, one line

# Dependencies — what you need from enterprise
requirements:             # Required dependencies (blocking)
  - what: string          # Plain English — what you need
    ready: string         # Plain English — how enterprise knows it's done
    canonical: string     # Optional — auto-mapped canonical type (e.g. integration.crm.api)

optional:                 # Non-blocking dependencies (improve experience)
  - what: string
    ready: string
    canonical: string
```

## Fields

### Top-level

| Field | Required | Description |
|---|---|---|
| `name` | Yes | Solution identifier. Kebab-case. Used for versioning and registry lookup. |
| `version` | Yes | Semver. Bump when dependencies change. Allows enterprises to track contract changes across versions. |
| `description` | Yes | One-line description. Written for enterprise stakeholders, not developers. |
| `requirements` | Yes | List of required dependencies. If any are unresolved, rollout cannot proceed. |
| `optional` | No | List of optional dependencies. Solution works without them but experience improves with them. |

### Dependency fields

| Field | Required | Description |
|---|---|---|
| `what` | Yes | Plain English description of what's needed. Written so a non-technical stakeholder can understand it. No jargon unless the audience is technical. |
| `ready` | Yes | Acceptance criteria. How does the enterprise know this dependency is resolved? Should be specific and verifiable — not "CRM access granted" but "We can create a contact and read an opportunity via API from our staging environment." |
| `canonical` | No | Auto-mapped canonical dependency type from the Interf schema. Used for deterministic matching across vendors and enterprises. Added automatically by the `declare` skill — vendors don't need to write this. |

## Design Principles

1. **Plain English first.** The contract is readable by FDEs, CS teams, solutions architects, and enterprise stakeholders. No config objects, no nested YAML, no type enums. Just say what you need and how to verify it.

2. **`what` + `ready` is the unit.** Every dependency is a pair: what the vendor needs, and how the enterprise verifies it's done. This eliminates the #1 source of rollout delays — ambiguity about what "ready" means.

3. **Versioned like a package.** Contracts evolve. Bump the version when dependencies change. Enterprises can diff versions to see what's new.

4. **Canonical is optional but powerful.** The `canonical` field enables deterministic matching — if enterprise has already resolved `auth.sso.saml` for another vendor, it auto-resolves for you. But the contract works without it.

5. **Flexible scope.** Dependencies can be anything:
   - Technical: API access, auth setup, test environments
   - Data: historical records, field mapping, sample datasets
   - Human: stakeholder availability, training, field mapping sessions
   - Process: security reviews, change management, internal approvals
   - Infrastructure: webhook endpoints, network access, environments

## Validation Rules

- `name` must be kebab-case, 1-64 characters
- `version` must be valid semver
- `description` must be non-empty
- `requirements` must have at least one item
- Every item in `requirements` and `optional` must have both `what` and `ready`
- `canonical` if present must match a known canonical type pattern (e.g. `integration.crm.api`)
