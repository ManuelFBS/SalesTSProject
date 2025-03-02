import { z } from 'zod';

// ~ Esquema de validación del empleado...
export const employeeSchema = z.object({
    dni: z.string().min(1, 'DNI is required...'),
    name: z.string().min(1, 'Name is required...'),
    lastName: z.string().min(1, 'Last name is required...'),
    // ? birthDate: z.string().date(),
    email: z.string().email('Invalid email address...'),
    phone: z.string().min(1, 'Phone is required...'),
    country: z.string().min(1, 'DNI is required...'),
    statusWork: z.enum([
        'Activo',
        'Vacaciones',
        'Permiso Laboral',
        'Reposo Médico',
        'Suspendido',
        'Desincorporado',
    ]),
    department: z.string().min(1, 'Department is required'),
    position: z.string().min(1, 'Position is required...'),
});
