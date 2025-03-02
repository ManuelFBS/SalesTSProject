import { Request, Response } from 'express';

export const testingAuthentication = (
    req: Request,
    res: Response,
) => {
    // * Devolver los datos del usuario...
    return res.json({
        message: 'Ruta de prueba funcionando',
    });
};
