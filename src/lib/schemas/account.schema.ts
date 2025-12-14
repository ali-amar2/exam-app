import { registerSchema } from "./auth.schema";
import z from 'zod';

export const accountSchema = registerSchema.pick({
    firstName: true,
    lastName: true,
    username: true,
    email: true,
    phone: true,
})
export type accountValues = z.infer<typeof accountSchema>;