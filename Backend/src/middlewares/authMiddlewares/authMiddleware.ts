import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../security/tokens/jwt.js';

// ~ Middleware de autenticación...
export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message:
                    'No se proporcionó token de autenticación',
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res
                .status(401)
                .json({ message: 'Token inválido' });
        }

        const decoded = verifyToken(token);

        // * Asegurarse de que se está añadiendo el usuario al request...
        (req as any).user = {
            id: decoded?.id,
            dni: decoded?.dni,
            role: decoded?.role,
        };

        next();
    } catch (error) {
        next(error);
    }
};

// ~ Middleware de autorización por roles...
export const authorizeRoles = (allowedRoles: string[]) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const user = (req as any).user;

        console.log('Usuario autenticado:', user);
        console.log('Roles permitidos:', allowedRoles);

        // * Verificar si el usuario existe...
        if (!user) {
            console.log('No hay usuario en la solicitud');
            return res.status(403).json({
                message: 'Usuario no autenticado...!!!',
            });
        }

        // * Verificar si el rol del usuario está en los roles permitidos...
        // * Cambio clave: usar !includes en lugar de includes...
        if (!allowedRoles.includes(user.role)) {
            console.log(
                `Rol denegado. Usuario: ${user.role}, Permitidos: ${allowedRoles}`,
            );
            return res.status(403).json({
                message: 'Acceso denegado...!!!',
                userRole: user.role,
                allowedRoles: allowedRoles,
            });
        }

        // * Si el rol está permitido, continuar...
        next();
    };
};
