"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// ~ Variables para el generador y el verificador...
const JWTSEC = process.env.JWT_SECRET;
const JWTEXP = process.env.JWT_EXPIRATION;
// ~ Generador de token...
const generateToken = (user) => {
    const payload = {
        id: user.id,
        dni: user.dni,
        role: user.role,
    };
    return jsonwebtoken_1.default.sign(payload, JWTSEC, { expiresIn: JWTEXP });
};
exports.generateToken = generateToken;
// ~ Verificador del token de sessión...
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWTSEC);
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map