"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.authMiddleware = void 0;
const jwt_js_1 = require("../../security/tokens/jwt.js");
// ~ Middleware de autenticación...
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: 'No se proporcionó token de autenticación',
            });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res
                .status(401)
                .json({ message: 'Token inválido' });
        }
        const decoded = (0, jwt_js_1.verifyToken)(token);
        // * Asegurarse de que se está añadiendo el usuario al request...
        req.user = {
            id: decoded === null || decoded === void 0 ? void 0 : decoded.id,
            dni: decoded === null || decoded === void 0 ? void 0 : decoded.dni,
            role: decoded === null || decoded === void 0 ? void 0 : decoded.role,
        };
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authMiddleware = authMiddleware;
// ~ Middleware de autorización por roles...
const authorizeRoles = (allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;
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
            console.log(`Rol denegado. Usuario: ${user.role}, Permitidos: ${allowedRoles}`);
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
exports.authorizeRoles = authorizeRoles;
//# sourceMappingURL=authMiddleware.js.map