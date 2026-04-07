import { z } from "zod";

export const productPromoSchema = z.object({
  productName: z.string().describe("Name of the product being promoted"),
  tagline: z.string().describe("Product tagline or subtitle"),
  features: z
    .array(z.string())
    .min(1)
    .max(6)
    .describe("List of product features to highlight"),
  primaryColor: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/)
    .describe("Primary brand color (hex)"),
  secondaryColor: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/)
    .describe("Secondary accent color (hex)"),
  backgroundColor: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/)
    .describe("Background color (hex)"),
  ctaText: z.string().describe("Call to action button text"),
});

export type ProductPromoProps = z.infer<typeof productPromoSchema>;
