import { z } from "zod";

export const investigationSchema = z.object({
  // Schritt 1
  category: z.enum(["WANTED_PERSON", "MISSING_PERSON", "UNKNOWN_DEAD", "STOLEN_GOODS"]),
  priority: z.enum(["NORMAL", "URGENT", "CRITICAL"]).default("NORMAL"),
  caseNumber: z.string().optional(),
  
  // Schritt 2
  title: z.string().min(1, "Titel erforderlich"),
  shortInfo: z.string().max(150).optional(),
  location: z.string().min(1, "Ort erforderlich"),
  date: z.date(),
  
  // Schritt 3
  age: z.string().optional(),
  height: z.string().optional(),
  features: z.string().optional(),
  clothing: z.string().optional(),
  
  // Schritt 4
  description: z.string().optional(),
  mainQuestion: z.string().optional(),
  
  // Schritt 5
  contactPhone: z.string().optional(),
  contactEmail: z.string().email().optional(),
});

export const step1Schema = investigationSchema.pick({
  category: true,
  priority: true,
});

export const step2Schema = investigationSchema.pick({
  title: true,
  shortInfo: true,
  location: true,
  date: true,
});

export const step3Schema = investigationSchema.pick({
  age: true,
  height: true,
  features: true,
  clothing: true,
});

export const step4Schema = investigationSchema.pick({
  description: true,
  mainQuestion: true,
});

export const step5Schema = investigationSchema.pick({
  contactPhone: true,
  contactEmail: true,
}); 