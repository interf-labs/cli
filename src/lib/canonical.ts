/**
 * Canonical dependency types for the Enterprise Readiness Protocol.
 * Update manually when new types are added.
 */

export const CANONICAL_TYPES = [
  "auth.api-credentials",
  "auth.service-account",
  "auth.sso.oidc",
  "auth.sso.saml",
  "data.field-mapping",
  "data.historical-export",
  "data.sample-dataset",
  "infra.network-access",
  "infra.test-environment",
  "integration.analytics.api",
  "integration.crm.api",
  "integration.crm.bulk-export",
  "integration.email.api",
  "integration.erp.api",
  "integration.erp.rfc",
  "integration.hris.api",
  "integration.messaging.api",
  "integration.ticketing.api",
  "integration.webhook.inbound",
  "integration.webhook.outbound",
  "process.architecture-review",
  "process.change-management",
  "process.compliance-review",
  "process.procurement",
  "process.security-review",
  "process.training",
  "stakeholder.business-owner",
  "stakeholder.data-team",
  "stakeholder.executive-sponsor",
  "stakeholder.it-admin",
  "stakeholder.security-team",
] as const;

export type CanonicalType = (typeof CANONICAL_TYPES)[number];

export const CANONICAL_CATEGORIES = [
  "integration",
  "auth",
  "data",
  "infra",
  "stakeholder",
  "process",
] as const;

export type CanonicalCategory = (typeof CANONICAL_CATEGORIES)[number];

export function isValidCanonical(id: string): boolean {
  return (CANONICAL_TYPES as readonly string[]).includes(id);
}

export function isValidCategory(id: string): boolean {
  const category = id.split(".")[0];
  return (CANONICAL_CATEGORIES as readonly string[]).includes(category);
}

export function suggestCanonical(id: string): string | undefined {
  if (isValidCanonical(id)) return id;
  const lower = id.toLowerCase().replace(/[_\s]/g, "-");
  const shorthands: Record<string, string> = {
    sso: "auth.sso.saml",
    saml: "auth.sso.saml",
    oidc: "auth.sso.oidc",
    "api-key": "auth.api-credentials",
    "api-keys": "auth.api-credentials",
    crm: "integration.crm.api",
    erp: "integration.erp.api",
    sap: "integration.erp.rfc",
    webhook: "integration.webhook.outbound",
    "security-review": "process.security-review",
    security: "process.security-review",
    training: "process.training",
    procurement: "process.procurement",
  };
  return shorthands[lower];
}
