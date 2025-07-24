// src/components/tenant_onboarding/tenantSchema.ts
import { z } from 'zod';

export const tenantSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(18, 'Must be at least 18'),
  gender: z.enum(['male', 'female', 'other']),
  dietaryPreference: z.string().optional(),
  spicinessLevel: z.number().min(0).max(5),
  cuisinePreferences: z.array(z.string()).nonempty('Select at least one cuisine'),
  dislikes: z.array(z.string()).optional(),
  cookDetails: z.string().optional(),
  whatsappNumber: z.string().regex(/^\d{10}$/, 'Invalid phone number'),
  language: z.string(),
  mealPreferences: z.object({
    breakfast: z.boolean(),
    lunch: z.boolean(),
    dinner: z.boolean(),
  }),
});

export type TenantFormValues = z.infer<typeof tenantSchema>;
