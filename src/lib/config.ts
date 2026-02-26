import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Package root (dist/lib/ → package root)
export const PACKAGE_ROOT = join(__dirname, "..", "..");

// Bundled skills shipped with the npm package
export const BUNDLED_SKILLS_DIR = join(PACKAGE_ROOT, "skills");

// User config
export const INTERF_DIR = join(homedir(), ".interf");
export const CREDENTIALS_PATH = join(INTERF_DIR, "credentials.json");

