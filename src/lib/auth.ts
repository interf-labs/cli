import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  unlinkSync,
} from "node:fs";
import { INTERF_DIR, CREDENTIALS_PATH } from "./config.js";

interface Credentials {
  token: string;
  email: string;
  expiresAt: string;
}

export function getCredentials(): Credentials | null {
  if (!existsSync(CREDENTIALS_PATH)) return null;
  try {
    const data = JSON.parse(readFileSync(CREDENTIALS_PATH, "utf-8"));
    if (new Date(data.expiresAt) < new Date()) return null;
    return data as Credentials;
  } catch {
    return null;
  }
}

export function saveCredentials(creds: Credentials): void {
  mkdirSync(INTERF_DIR, { recursive: true });
  writeFileSync(CREDENTIALS_PATH, JSON.stringify(creds, null, 2), {
    mode: 0o600,
  });
}

export function clearCredentials(): void {
  if (existsSync(CREDENTIALS_PATH)) unlinkSync(CREDENTIALS_PATH);
}

export function isAuthenticated(): boolean {
  return getCredentials() !== null;
}
