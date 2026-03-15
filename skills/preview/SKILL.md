---
name: preview
description: >
  Preview enterprise rollout for an interf.yaml onboarding contract. Simulates
  resolution timelines, identifies stakeholders, and surfaces risks against
  enterprise profiles. Use after declaring a contract to see what rollout looks like.
license: MIT
metadata:
  author: interf
  version: "2.0.0"
---

# Preview Enterprise Rollout

Take the `interf.yaml` onboarding contract and preview what rollout looks like at a target enterprise.

## When to Run

After a contract is declared (via the `declare` skill or written manually), or when the user asks to preview rollout for a specific company or enterprise type. If no `interf.yaml` exists, run the `declare` skill first.

## Process

1. Read `interf.yaml` from the project root
2. Map the user's target to an enterprise profile (see below)
3. For EACH dependency, estimate resolution timeline using profile multipliers
4. Identify the critical path — longest dependency chain
5. Calculate total days across all phases
6. Aggregate stakeholders, risks, and blockers
7. Present the rollout preview

## Enterprise Profiles

Map company names to the closest profile. Add industry-specific considerations.

| Profile | Multiplier | What Makes It Slower |
|---|---|---|
| Fortune 500 | 2.5x | CAB review, vendor risk assessment, procurement cycle, multiple approval layers |
| Fortune 500 Bank | 3.0x | OCC/FFIEC regulatory review, third-party risk management, model risk assessment |
| Fortune 500 Insurer | 3.0x | State regulatory notification, AI ethics committee, catastrophic risk assessment |
| Enterprise (1K-10K) | 2.0x | Change management process, architecture review board |
| Mid-Market | 1.5x | Lighter security review, some procurement process |
| Growth Stage | 1.2x | Lightweight security review, fast decision-making |
| Startup | 1.0x | Minimal process, direct access to decision-makers |

## Baseline Estimates

Estimate days based on the nature of each dependency:

| Dependency Nature | Base Days | Typical Blockers |
|---|---|---|
| API/system access | 5 | Credential provisioning, security review, rate limit negotiation |
| Database/data access | 8 | Data governance approval, schema review, data residency |
| Auth/SSO setup | 10 | Identity team backlog, SSO config complexity, testing |
| Data export/migration | 7 | Data team availability, format negotiation, PII review |
| Human coordination | 5 | Scheduling, availability, competing priorities |
| Security review | 15 | Assessment questionnaire, penetration test, remediation |
| Legal/DPA review | 12 | Legal team backlog, negotiation rounds, redlines |
| Procurement | 10 | Budget approval, vendor onboarding, contract negotiation |
| Change management | 8 | Stakeholder alignment, communication plan, training |
| Infrastructure setup | 5 | Provisioning, network config, environment validation |

Apply the profile multiplier to each base estimate.

## Output Format

Present results as a rollout preview:

```
Rollout Preview: {Company Name} ({Profile Type})

Summary
  Total estimated days:  {X}
  Dependencies:          {N} required, {N} optional
  Stakeholders needed:   {N} ({list key roles})
  Overall risk:          {Critical/High/Medium/Low}

Timeline by Phase
  Phase 1 — Assessments & Approvals        Days 1-{X}
  Phase 2 — Access & Provisioning           Days {X}-{X}
  Phase 3 — Integration & Testing           Days {X}-{X}
  Phase 4 — Rollout & Go-Live              Days {X}-{X}

Dependency Breakdown
  {Dependency}           {X} days   {Risk}   {Who's involved, what blocks it}
  {Dependency}           {X} days   {Risk}   {Who's involved, what blocks it}
  ...

Critical Path
  The longest chain: {Dep A} → {Dep B} → {Dep C} = {X} days
  Start these immediately: {list}

Top Risks
  1. {Risk} — {likelihood}, {impact}, {mitigation}
  2. {Risk} — {likelihood}, {impact}, {mitigation}
  3. {Risk} — {likelihood}, {impact}, {mitigation}

Recommendation
  {Top 1-2 actions to take right now to de-risk the rollout}
```

## Guidelines

For EACH dependency, think through:
- Who specifically at the enterprise needs to be involved (CISO, CDO, CTO, data team lead, etc.)
- What sequential steps are required (vendor assessment -> legal -> procurement -> implementation)
- What could block or delay each step
- Industry-specific considerations

Be realistic. Fortune 500 companies have heavy governance: procurement takes months, security assessments require vendor questionnaires, legal reviews DPAs, CAB meets monthly. Don't underestimate.

## After Presenting

- Save analysis to `.interf/previews/{company-name}-{timestamp}.json`
- Suggest the top action: "Start the security review immediately — it's on the critical path at {X} days"
