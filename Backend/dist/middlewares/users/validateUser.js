"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const usersSchema_js_1 = require("../../validations/users/usersSchema.js");
const zod_1 = require("zod");
const validateUser = (req, res, next) => {
    try {
        // * Validar el cuerpo de la solicitud...
        const validation = usersSchema_js_1.userSchema.safeParse(req.body);
        // * Si la validación falla, responder con un error 400...
        if (!validation.success) {
            res.status(400).json({
                errors: validation.error.errors,
            });
            return;
        }
        // * Si la validación es exitosa, pasar al siguiente middleware o controlador...
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            // * Si hay errores de validación, responder con un estado 400 y los errores...
            res.status(400).json({ errors: error.errors });
            return;
        }
        // * Si es otro tipo de error, responder con un estado 500...
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};
exports.validateUser = validateUser;
//# sourceMappingURL=validateUser.js.map