import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { saveCredentials, getCredentials, clearCredentials, isAuthenticated } from "./auth.js";
import { CREDENTIALS_PATH, INTERF_DIR } from "./config.js";

describe("auth", () => {
  // These tests use the real ~/.interf/ path — only test the stub behavior
  const testCreds = {
    token: "test-token-123",
    email: "test@interf.com",
    expiresAt: new Date(Date.now() + 3600000).toISOString(),
  };

  afterEach(() => {
    clearCredentials();
  });

  it("saves and retrieves credentials", () => {
    saveCredentials(testCreds);
    const creds = getCredentials();
    expect(creds).not.toBeNull();
    expect(creds!.token).toBe(testCreds.token);
    expect(creds!.email).toBe(testCreds.email);
  });

  it("returns null when no credentials exist", () => {
    clearCredentials();
    expect(getCredentials()).toBeNull();
  });

  it("clears credentials", () => {
    saveCredentials(testCreds);
    expect(isAuthenticated()).toBe(true);
    clearCredentials();
    expect(isAuthenticated()).toBe(false);
  });

  it("returns null for expired credentials", () => {
    saveCredentials({
      ...testCreds,
      expiresAt: new Date(Date.now() - 1000).toISOString(),
    });
    expect(getCredentials()).toBeNull();
  });

  it("creates ~/.interf directory if needed", () => {
    clearCredentials();
    if (existsSync(INTERF_DIR)) rmSync(INTERF_DIR, { recursive: true });
    saveCredentials(testCreds);
    expect(existsSync(INTERF_DIR)).toBe(true);
  });
});
