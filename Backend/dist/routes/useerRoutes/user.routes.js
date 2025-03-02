"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_js_1 = require("../../controllers/UsersControllers/users.controller.js");
const authMiddleware_js_1 = require("../../middlewares/authMiddlewares/authMiddleware.js");
const validateUser_js_1 = require("../../middlewares/users/validateUser.js");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
// * Función wrapper para manejar promesas...
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
userRouter.post('/user/new', 
// > Primero autenticación...
asyncHandler(authMiddleware_js_1.authMiddleware), 
// > Luego autorización...
asyncHandler((0, authMiddleware_js_1.authorizeRoles)(['Owner'])), 
// > Validación...
validateUser_js_1.validateUser, 
// > Controlador...
asyncHandler(users_controller_js_1.createNewUser));
//# sourceMappingURL=user.routes.js.map