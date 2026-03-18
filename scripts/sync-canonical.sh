#!/bin/bash
# Auto-generates src/lib/canonical.ts from protocol submodule frontmatter.
# Source of truth: the `id:` field in each type's YAML frontmatter.
set -e

TYPES_DIR="protocol/skills/enterprise-readiness-protocol/canonical-dependencies"
OUT="src/lib/canonical.ts"

if [ ! -d "$TYPES_DIR" ]; then
  echo "Protocol submodule not found. Run: git submodule update --init"
  exit 1
fi

# Extract ONLY from frontmatter `id:` fields — the single source of truth
IDS=$(grep -rh "^id: " "$TYPES_DIR" --include="*.md" | sed 's/^id: //' | sort -u)

COUNT=$(echo "$IDS" | wc -l | tr -d ' ')
echo "Syncing $COUNT canonical types from frontmatter id: fields"

cat > "$OUT" << 'HEADER'
/**
 * Auto-generated from canonical-dependencies frontmatter.
 * Source of truth: the `id:` field in each type markdown file.
 * DO NOT EDIT — run `npm run sync-canonical` to regenerate.
 */

export const CANONICAL_TYPES = [
HEADER

echo "$IDS" | while read -r id; do
  echo "  \"$id\"," >> "$OUT"
done

cat >> "$OUT" << 'FOOTER'
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
FOOTER

echo "Done. $COUNT types."
