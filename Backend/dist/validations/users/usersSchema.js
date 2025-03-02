"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
// ~ Esquema de validación del usuario...
exports.userSchema = zod_1.z.object({
    dni: zod_1.z.string().min(1, 'DNI is required...'),
    user: zod_1.z.string().min(5, 'User is required...'),
    password: zod_1.z
        .string()
        .min(6, 'Password must be at least 6 characters...')
        .max(15, 'Password must be 15 characters max...'),
    role: zod_1.z.enum(['Owner', 'Admin', 'Employee']),
});
//# sourceMappingURL=usersSchema.js.map