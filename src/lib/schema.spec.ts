import { describe, it, expect } from "vitest";
import { validateManifest } from "./schema.js";

describe("schema", () => {
  const validManifest = {
    name: "test-agent",
    version: "0.1.0",
    description: "A test agent for CRM automation",
    requirements: [
      {
        what: "Read/write access to your CRM (contacts and opportunities)",
        ready: "We can create a contact and read an opportunity via API from our staging environment",
      },
    ],
  };

  it("accepts a valid manifest", () => {
    const result = validateManifest(validManifest);
    expect(result.success).toBe(true);
  });

  it("accepts requirements with canonical field", () => {
    const manifest = {
      ...validManifest,
      requirements: [
        {
          what: "Read/write access to your CRM",
          ready: "We can create a contact via API",
          canonical: "integration.crm.api",
        },
      ],
    };
    const result = validateManifest(manifest);
    expect(result.success).toBe(true);
  });

  it("accepts optional requirements", () => {
    const manifest = {
      ...validManifest,
      optional: [
        {
          what: "Webhook endpoint for real-time updates",
          ready: "We receive a test webhook payload within 5 seconds",
        },
      ],
    };
    const result = validateManifest(manifest);
    expect(result.success).toBe(true);
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

  it("rejects empty requirements", () => {
    const result = validateManifest({ ...validManifest, requirements: [] });
    expect(result.success).toBe(false);
  });

  it("rejects requirement missing what", () => {
    const result = validateManifest({
      ...validManifest,
      requirements: [{ ready: "test criteria" }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects requirement missing ready", () => {
    const result = validateManifest({
      ...validManifest,
      requirements: [{ what: "test requirement" }],
    });
    expect(result.success).toBe(false);
  });

  it("allows optional fields to be omitted", () => {
    const minimal = {
      name: "minimal-agent",
      version: "1.0.0",
      description: "Minimal test",
      requirements: [
        {
          what: "Some requirement",
          ready: "Some criteria",
        },
      ],
    };
    const result = validateManifest(minimal);
    expect(result.success).toBe(true);
  });
});
