import z from "zod";

export const querySchema = z.object({
  brand: z
    .string()
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
  model: z
    .string()
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
  year: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : undefined))
    .refine((v) => v === undefined || Number.isFinite(v), {
      message: "year must be a number",
    }),
  page: z
    .string()
    .optional()
    .transform((v) => (v ? Math.max(1, Number(v)) : 1)),
  limit: z
    .string()
    .optional()
    .transform((v) => (v ? Math.min(100, Math.max(1, Number(v))) : 20)),
});

export type QuerySchemaInput = z.infer<typeof querySchema>;
