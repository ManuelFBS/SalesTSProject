import { Request, Response, NextFunction } from 'express';
import { userSchema } from '../../validations/users/usersSchema.js';
import { ZodError } from 'zod';

export const validateUser = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        // * Validar el cuerpo de la solicitud...
        const validation = userSchema.safeParse(req.body);

        // * Si la validación falla, responder con un error 400...
        if (!validation.success) {
            res.status(400).json({
                errors: validation.error.errors,
            });
            return;
        }

        // * Si la validación es exitosa, pasar al siguiente middleware o controlador...
        next();
    } catch (error) {
        if (error instanceof ZodError) {
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
