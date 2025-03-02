import csrf from 'csurf';
import { Request, Response, NextFunction } from 'express';

// ~ Configuración de protección CSRF...
export const csrfProtection = csrf({
    cookie: true,
    // * Para APIs que usan tokens de autenticación...
    ignoreMethods: [
        'GET',
        'HEAD',
        'OPTIONS',
        'POST',
        'PUT',
        'DELETE',
    ],
});

// ~ Middleware para manejar errores de CSRF...
export const csrfErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);

    // * Middleware para manejar errores de CSRF...
    res.status(403).json({
        message:
            'Sesión inválida o token CSRF incorrecto...!!!',
        error: 'CSRF token mismatch...',
    });
};

// ~ Nuevo middleware para omitir CSRF en rutas autenticadas...
export const conditionalCsrfProtection = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // * Omitir CSRF para:
    // > 1. Rutas de autenticación...
    // > 2. Rutas con autorización (token JWT)...
    if (
        req.path.startsWith('/api/auth') ||
        req.path.startsWith('/auth') ||
        req.headers.authorization
    ) {
        return next();
    }

    // * Aplicar CSRF para otras rutas...
    csrfProtection(req, res, next);
};
