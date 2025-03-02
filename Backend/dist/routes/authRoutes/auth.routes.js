"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRouter = void 0;
const express_1 = __importDefault(require("express"));
const auths_controller_js_1 = require("../../authentication/auth/auths.controller.js");
const authMiddleware_js_1 = require("../../middlewares/authMiddlewares/authMiddleware.js");
const logRouter = express_1.default.Router();
exports.logRouter = logRouter;
// * Función wrapper para manejar promesas...
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
logRouter.post('/login', asyncHandler(auths_controller_js_1.login));
logRouter.post('/logout', asyncHandler(authMiddleware_js_1.authMiddleware), auths_controller_js_1.logout);
//# sourceMappingURL=auth.routes.js.map