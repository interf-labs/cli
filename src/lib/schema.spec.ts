import { describe, it, expect } from "vitest";
import { validateManifest } from "./schema.js";

describe("schema", () => {
  const validManifest = {
    name: "test-agent",
    version: "0.1.0",
    description: "A test agent for CRM automation",
    dependencies: [
      {
        type: "api",
        name: "Salesforce API",
        description: "Read/write contacts",
        required: true,
        config: { endpoint: "https://api.salesforce.com" },
      },
    ],
    capabilities: ["read_contacts"],
    risk_level: "medium",
  };

  it("accepts a valid manifest", () => {
    const result = validateManifest(validManifest);
    expect(result.success).toBe(true);
  });

  it("accepts all dependency types", () => {
    const types = [
      "api",
      "database",
      "auth",
      "storage",
      "network",
      "secret",
      "approval",
      "compliance",
    ];
    for (const type of types) {
      const manifest = {
        ...validManifest,
        dependencies: [{ type, name: `${type} dep`, required: true }],
      };
      const result = validateManifest(manifest);
      expect(result.success, `type "${type}" should be valid`).toBe(true);
    }
  });

  it("accepts all risk levels", () => {
    for (const risk_level of ["low", "medium", "high", "critical"]) {
      const result = validateManifest({ ...validManifest, risk_level });
      expect(result.success, `risk "${risk_level}" should be valid`).toBe(true);
    }
  });

  it("rejects missing name", () => {
    const { name, ...noName } = validManifest;
    const result = validateManifest(noName);
    expect(result.success).toBe(false);
  });

  it("rejects invalid version", () => {
    const result = validateManifest({ ...validManifest, version: "bad" });
    expect(result.success).toBe(false);
  });

  it("rejects missing description", () => {
    const { description, ...noDesc } = validManifest;
    const result = validateManifest(noDesc);
    expect(result.success).toBe(false);
  });

  it("rejects empty dependencies", () => {
    const result = validateManifest({ ...validManifest, dependencies: [] });
    expect(result.success).toBe(false);
  });

  it("rejects invalid dependency type", () => {
    const result = validateManifest({
      ...validManifest,
      dependencies: [{ type: "invalid", name: "test", required: true }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid risk level", () => {
    const result = validateManifest({
      ...validManifest,
      risk_level: "extreme",
    });
    expect(result.success).toBe(false);
  });

  it("defaults required to true when omitted", () => {
    const manifest = {
      ...validManifest,
      dependencies: [{ type: "api", name: "Test API" }],
    };
    const result = validateManifest(manifest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.dependencies[0].required).toBe(true);
    }
  });

  it("allows optional fields to be omitted", () => {
    const minimal = {
      name: "minimal-agent",
      version: "1.0.0",
      description: "Minimal test",
      dependencies: [{ type: "api", name: "Some API" }],
    };
    const result = validateManifest(minimal);
    expect(result.success).toBe(true);
  });
});
