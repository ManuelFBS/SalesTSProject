"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conditionalCsrfProtection = exports.csrfErrorHandler = exports.csrfProtection = void 0;
const csurf_1 = __importDefault(require("csurf"));
// ~ Configuración de protección CSRF...
exports.csrfProtection = (0, csurf_1.default)({
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
const csrfErrorHandler = (err, req, res, next) => {
    if (err.code !== 'EBADCSRFTOKEN')
        return next(err);
    // * Middleware para manejar errores de CSRF...
    res.status(403).json({
        message: 'Sesión inválida o token CSRF incorrecto...!!!',
        error: 'CSRF token mismatch...',
    });
};
exports.csrfErrorHandler = csrfErrorHandler;
// ~ Nuevo middleware para omitir CSRF en rutas autenticadas...
const conditionalCsrfProtection = (req, res, next) => {
    // * Omitir CSRF para:
    // > 1. Rutas de autenticación...
    // > 2. Rutas con autorización (token JWT)...
    if (req.path.startsWith('/api/auth') ||
        req.path.startsWith('/auth') ||
        req.headers.authorization) {
        return next();
    }
    // * Aplicar CSRF para otras rutas...
    (0, exports.csrfProtection)(req, res, next);
};
exports.conditionalCsrfProtection = conditionalCsrfProtection;
//# sourceMappingURL=csrf.js.map