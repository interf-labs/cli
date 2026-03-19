import { describe, it, expect } from "vitest";
import { validateManifest } from "./schema.js";

describe("schema", () => {
  const validManifest = {
    name: "test-project",
    version: "0.1.0",
    description: "A test project",
    requirements: [
      {
        what: "Read/write access to your CRM",
        ready: "We can create a contact via API from staging",
      },
    ],
  };

  it("accepts a valid manifest", () => {
    expect(validateManifest(validManifest).success).toBe(true);
  });

  it("accepts optional requirements", () => {
    const manifest = {
      ...validManifest,
      optional: [{ what: "Webhooks", ready: "We get events" }],
    };
    expect(validateManifest(manifest).success).toBe(true);
  });

  it("rejects missing name", () => {
    const { name, ...noName } = validManifest;
    expect(validateManifest(noName).success).toBe(false);
  });

  it("rejects invalid version", () => {
    expect(validateManifest({ ...validManifest, version: "bad" }).success).toBe(false);
  });

  it("rejects missing description", () => {
    const { description, ...noDesc } = validManifest;
    expect(validateManifest(noDesc).success).toBe(false);
  });

  it("rejects empty requirements", () => {
    expect(validateManifest({ ...validManifest, requirements: [] }).success).toBe(false);
  });

  it("rejects requirement missing what", () => {
    expect(validateManifest({ ...validManifest, requirements: [{ ready: "test" }] }).success).toBe(false);
  });

  it("rejects requirement missing ready", () => {
    expect(validateManifest({ ...validManifest, requirements: [{ what: "test" }] }).success).toBe(false);
  });
});
