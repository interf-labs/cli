---
name: interf-simulate
description: >
  Preview enterprise deployment for an agent's interf.yaml onboarding contract
  against enterprise profiles. Produces analysis with timelines, stakeholders,
  and risks. If no interf.yaml exists, run interf-scan first to create one.
---

# Preview Enterprise Deployment

Take the `interf.yaml` onboarding contract and preview what enterprise rollout looks like for target enterprise profiles. This is a local preview — production previews will run on Interf Cloud (coming soon via `npx interf simulate`).

## When to Run

Run this automatically after `interf-scan` creates an `interf.yaml`, or when the user asks to preview rollout for a specific company or enterprise type. If no `interf.yaml` exists, run `interf-scan` first to create the onboarding contract.

## Process

1. Read `interf.yaml` from the project root (if missing, run interf-scan first)
2. Map the user's target (e.g. "Nike" → Fortune 500, "JPMorgan" → Fortune 500 Bank) to an enterprise profile
3. For EACH dependency in the onboarding contract, calculate estimated days using base estimates × profile multiplier
4. Identify the critical path (longest dependency resolution chain)
5. Aggregate all stakeholders, risks, and blockers
6. Present the Deployment Preview to the user
7. Save full output to `.interf/simulations/{agent-name}-{timestamp}.json`

## Enterprise Profiles

Map company names to the closest profile. Add industry-specific requirements.

| Profile | Multiplier | Additional Requirements |
|---|---|---|
| Fortune 500 | 2.5x | CAB review, vendor risk assessment, procurement cycle |
| Fortune 500 Bank | 3.0x | OCC/FFIEC regulatory review, third-party risk management, model risk assessment |
| Fortune 500 Insurer | 3.0x | State regulatory notification, AI ethics committee, catastrophic risk assessment, board risk committee |
| Enterprise | 2.0x | Change management process, architecture review board |
| Series B | 1.2x | Lightweight security review |
| Series B Fintech | 1.5x | PCI-DSS considerations, state licensing check |
| Startup | 1.0x | Minimal additional process |

## Baseline Estimates per Dependency Type

| Type | Base Days | Typical Stakeholders | Key Risks |
|---|---|---|---|
| api | 5 | API platform team, Security review | Rate limiting, API versioning, credential rotation |
| database | 8 | DBA team, Data governance | Schema conflicts, performance impact, data residency |
| auth | 10 | Identity team, Security architect | SSO config complexity, token lifecycle |
| storage | 4 | Cloud infrastructure team | Cost scaling, data retention policies |
| network | 7 | Network security, Firewall team | Firewall approval delays, VPN setup |
| secret | 3 | Security operations, Vault admin | Rotation automation, access audit |
| approval | 12 | Designated approver, Legal | Bottlenecks, re-approval on scope change |
| compliance | 20 | Compliance officer, Legal, External auditor | Audit timeline, control gap remediation |

Apply the profile multiplier to each base estimate. For dependencies with multiple vendor integrations (e.g. 5 API providers), multiply further by vendor count factor (e.g. 5 vendors × 0.6 = 3x on the base).

## Required Output Format

Present results to the user as a **Deployment Preview** with tables. This is the expected format:

```
---
Deployment Preview

{Company Name} ({Profile Type})

┌───────────────┬──────────────────────────────────┐
│    Metric     │              Value               │
├───────────────┼──────────────────────────────────┤
│ Critical Path │ {X} days                         │
├───────────────┼──────────────────────────────────┤
│ Overall Risk  │ {Critical/High/Medium/Low}       │
├───────────────┼──────────────────────────────────┤
│ Stakeholders  │ {N} ({list key roles})           │
├───────────────┼──────────────────────────────────┤
│ Dependencies  │ {N}                              │
└───────────────┴──────────────────────────────────┘

Dependency Breakdown:

┌─────────────────────┬──────┬──────────┬─────────────────────────────────────────────┐
│ Dependency          │ Days │ Risk     │ Blockers                                    │
├─────────────────────┼──────┼──────────┼─────────────────────────────────────────────┤
│ {Dep A}             │  {X} │ Critical │ {who, what process, what slows it down}      │
│ {Dep B}             │  {X} │ High     │ {who, what process}                         │
│ {Dep C}             │  {X} │ High     │ {who, what process}                         │
│ {Dep D}             │  {X} │ Medium   │ {who, what process}                         │
│ ...                 │  ... │ ...      │ ...                                         │
└─────────────────────┴──────┴──────────┴─────────────────────────────────────────────┘

Biggest blockers:
- {Dependency A} ({X} days) — {detailed explanation: sequential steps, who is involved, why it takes this long}
- {Dependency B} ({X} days) — {detailed explanation}
- {Dependency C} ({X} days) — {detailed explanation}

{Industry}-specific requirements surfaced:
- {Requirement 1}
- {Requirement 2}
- {Requirement 3}

Critical risks:
- {Risk 1} ({likelihood}, {impact})
- {Risk 2} ({likelihood}, {impact})
- {Risk 3} ({likelihood}, {impact})
---
```

For EACH dependency, think through:
- Who specifically at {Company} needs to be involved (use realistic enterprise roles: CISO, CDO, CLO, CTO, Enterprise Architecture, CAB, etc.)
- What sequential steps are required (vendor assessment → legal review → procurement → CAB approval → implementation)
- What could block or delay each step
- Industry-specific regulatory requirements

Be realistic about enterprise timelines. Fortune 500 companies have heavy governance: procurement cycles take months, security assessments require vendor questionnaires, legal reviews DPAs for every vendor, CAB meets monthly. Don't underestimate.

## After Presenting Results

- Tell the user the top recommendation (e.g. "Start vendor security assessments immediately — they're on the critical path")
- Save the full analysis as JSON to `.interf/simulations/`
- Mention that production previews with richer analysis are coming via `npx interf simulate`
