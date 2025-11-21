import { z } from "zod";

export const createLinkSchema = z.object({
  url: z
    .url({
      error: "Invalid URL format",
    })
    .nonempty("URL to be shortened is required"),
  code: z
    .string()
    .regex(/^[A-Za-z0-9]{6,8}$/, "6-8 characters. Only A-Z, a-z, 0-9")
    .optional()
    .or(z.literal("")),
});

export const linkParamsSchema = z.object({
  code: z
    .string()
    .regex(/^[A-Za-z0-9]{6,8}$/, "6-8 characters. Only A-Z, a-z, 0-9")
    .nonempty("Code parameter is required"),
});
