import { z } from "zod";

export const RequirementSchema = z.object({
  what: z.string().min(1, "Requirement 'what' is required"),
  ready: z.string().min(1, "Requirement 'ready' criteria is required"),
  canonical: z.string().optional(),
});

export const ManifestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  version: z
    .string()
    .regex(/^\d+\.\d+\.\d+/, "Version must be semver (e.g. 0.1.0)"),
  description: z.string().min(1, "Description is required"),
  requirements: z
    .array(RequirementSchema)
    .min(1, "At least one requirement is required"),
  optional: z.array(RequirementSchema).optional(),
});

export type Manifest = z.infer<typeof ManifestSchema>;
export type Requirement = z.infer<typeof RequirementSchema>;

export function validateManifest(data: unknown) {
  return ManifestSchema.safeParse(data);
}
