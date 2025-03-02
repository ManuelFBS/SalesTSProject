import { Request, Response, NextFunction } from 'express';
// import { employeeSchema } from '../validations/employees/employeesSchema.js';
// import { userSchema } from '../validations/users/usersSchema.js';
import { ZodError } from 'zod';

/* 
    + Con esta validación global, lo que se pretende es, tomar todos los datos
    + de entrada: employeeSchema, userSchema, o algún otro, para ser verificados
    + en una sola función, en haras de hcer un código reutilizable y más limpio...
    ! Actualmente se encuentra en construcción...
*/

const validateInputData = (
    schema: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        // * Validar el cuerpo de la solicitud...
        const validation = schema.safeParse(req.body);

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

export { validateInputData };
