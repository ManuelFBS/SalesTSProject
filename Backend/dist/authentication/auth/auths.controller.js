"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const index_js_1 = require("../../models/index.js");
const decrypt_js_1 = require("../../security/decrypt/decrypt.js");
const Const_js_1 = require("../../libs/Const.js");
const jwt_js_1 = require("../../security/tokens/jwt.js");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { user, password } = req.body;
    try {
        // * Se busca el usuario...
        const userRecord = yield index_js_1.User.findOne({
            where: { user },
            include: [
                {
                    model: index_js_1.Employee,
                    include: [index_js_1.EmployeeStatus],
                },
            ],
        });
        if (!userRecord) {
            return res.status(404).json({
                message: 'Credenciales inválidas',
            });
        }
        // * Se verifica el password...
        const isValidPassword = yield (0, decrypt_js_1.verifyPassword)(password, userRecord.password, next);
        if (!isValidPassword) {
            return res.status(401).json({
                message: 'Contraseña incorrecta',
            });
        }
        // * Acceder al estado del empleado de manera más directa...
        const employeeStatus = yield ((_a = userRecord.Employee) === null || _a === void 0 ? void 0 : _a.getEmployeeStatus());
        if ((employeeStatus === null || employeeStatus === void 0 ? void 0 : employeeStatus.statusUser) ===
            Const_js_1.USER_STATUS.BLOCKED) {
            return res.status(403).json({
                message: 'Usuario bloqueado...!!!',
            });
        }
        else if ((employeeStatus === null || employeeStatus === void 0 ? void 0 : employeeStatus.statusUser) ===
            Const_js_1.USER_STATUS.DELETED) {
            return res.status(403).json({
                message: 'Usuario bloqueado...!!!',
            });
        }
        // * Generar token JWT - Pasamos el usuario completo...
        const token = (0, jwt_js_1.generateToken)(userRecord);
        res.json({
            token,
            user: {
                id: userRecord.id,
                dni: userRecord.dni,
                role: userRecord.role,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const logout = (req, res, next) => {
    try {
        if (!res.cookie) {
            res.status(400).json({
                message: 'No hay ninguna sessión activa...!!!',
            });
        }
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout exitoso' });
    }
    catch (error) {
        next(error);
    }
};
exports.logout = logout;
//# sourceMappingURL=auths.controller.js.map