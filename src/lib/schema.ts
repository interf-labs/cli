import { z } from "zod";

export const DependencyTypeEnum = z.enum([
  "api",
  "database",
  "auth",
  "storage",
  "network",
  "secret",
  "approval",
  "compliance",
]);

export const RiskLevelEnum = z.enum(["low", "medium", "high", "critical"]);

export const DependencySchema = z.object({
  type: DependencyTypeEnum,
  name: z.string().min(1, "Dependency name is required"),
  description: z.string().optional(),
  required: z.boolean().default(true),
  config: z.record(z.unknown()).optional(),
});

export const ManifestSchema = z.object({
  name: z.string().min(1, "Agent name is required"),
  version: z
    .string()
    .regex(/^\d+\.\d+\.\d+/, "Version must be semver (e.g. 0.1.0)"),
  description: z.string().min(1, "Description is required"),
  dependencies: z
    .array(DependencySchema)
    .min(1, "At least one dependency is required"),
  capabilities: z.array(z.string()).optional(),
  risk_level: RiskLevelEnum.optional(),
});

export type Manifest = z.infer<typeof ManifestSchema>;
export type Dependency = z.infer<typeof DependencySchema>;

export function validateManifest(data: unknown) {
  return ManifestSchema.safeParse(data);
}
