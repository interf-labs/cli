---
name: interf-scan
description: >
  Scan a codebase and extract an interf.yaml onboarding contract declaring all
  enterprise dependencies. Use when the user wants to create their agent's
  onboarding contract.
---

# Scan Codebase — Extract Onboarding Contract

Scan this project and extract an `interf.yaml` onboarding contract declaring every external dependency this agent/tool needs from enterprise environments.

## Process

### Step 1: Understand the Project
- Read README, package.json / pyproject.toml / go.mod, and key config files
- Identify what the project does and whether it's an AI agent, tool, service, or library
- Understand its core capabilities

### Step 2: Scan for External Dependencies

**API Dependencies** (type: api)
- HTTP client calls (fetch, axios, httpx, net/http)
- SDK imports (@aws-sdk, google-cloud, stripe, twilio, salesforce)
- GraphQL/REST endpoint references
- Webhook configurations

**Database Dependencies** (type: database)
- Connection strings, ORM configs (Prisma, Drizzle, SQLAlchemy)
- Database driver imports (pg, mysql2, mongoose, redis)
- Migration files

**Authentication Dependencies** (type: auth)
- OAuth/OIDC configurations
- SAML/SSO setup
- JWT handling, auth middleware
- Identity provider references (Okta, Auth0, WorkOS, Azure AD)

**Storage Dependencies** (type: storage)
- S3/GCS/Azure Blob references
- File upload handling, CDN configs

**Network Dependencies** (type: network)
- Hardcoded hostnames or IP addresses
- Port configurations, VPN/tunnel references

**Secret Dependencies** (type: secret)
- Environment variable references (process.env.*, os.environ)
- .env file patterns
- Vault/secret manager references (AWS Secrets Manager, HashiCorp Vault)

**Compliance Requirements** (type: compliance)
- PII/PHI handling (user data, health records, financial data)
- Encryption implementations
- Audit logging, data retention logic

**Approval Requirements** (type: approval)
- References to review processes, deployment gates
- Access control patterns suggesting stakeholder sign-off

### Step 3: Assess Risk Level
- **low**: Read-only access, no PII, no external writes
- **medium**: Write access to non-sensitive systems
- **high**: PII access, financial data, or broad write permissions
- **critical**: Healthcare data, payment processing, or admin-level access

### Step 4: Write the Onboarding Contract
Write `interf.yaml` to the project root. Include clear descriptions for each dependency explaining WHY it's needed, not just what it is.

### Step 5: Validate
After writing, run `npx interf validate` to check the onboarding contract against the schema.

### Step 6: Summarize
Tell the user:
- Total dependencies found by type
- Risk level assessment with justification
- Any dependencies that might be missing (suggest review)
- Next steps: review the contract, then preview enterprise deployment (e.g. "use npx interf to preview onboarding for Nike")
