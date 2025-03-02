import { z } from 'zod';

// ~ Esquema de validación del usuario...
export const userSchema = z.object({
    dni: z.string().min(1, 'DNI is required...'),
    user: z.string().min(5, 'User is required...'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters...')
        .max(15, 'Password must be 15 characters max...'),
    role: z.enum(['Owner', 'Admin', 'Employee']),
});
