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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUser = void 0;
const Employee_js_1 = __importDefault(require("../../models/Employees/Employee.js"));
const User_js_1 = require("../../models/Users/User.js");
const usersSchema_js_1 = require("../../validations/users/usersSchema.js");
const encrypting_js_1 = require("../../security/encrypt/encrypting.js");
const createNewUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // * Validar los datos de entrada...
        const validation = usersSchema_js_1.userSchema.safeParse(req.body);
        if (!validation.success) {
            return res
                .status(400)
                .json({ errors: validation.error.errors });
        }
        const { dni, user, password, role } = validation.data;
        const employee = yield Employee_js_1.default.findOne({
            where: { dni },
        });
        if (!employee) {
            return res
                .status(404)
                .json({ message: 'Employee not found' });
        }
        // * Se procede a la encriptación del password...
        const hashedPassword = yield (0, encrypting_js_1.encrypted)(password);
        // * Se crea el nuevo usuario...
        const newUser = yield User_js_1.User.create({
            dni,
            user,
            password: hashedPassword,
            role,
        });
        // req.user = {
        //     id: newUser.id,
        //     dni: newUser.dni,
        //     role: newUser.role,
        // };
        res.status(201).json({
            message: `El usuario: ${user} ha sido creado satisfactoriamente...!`,
            newUser,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createNewUser = createNewUser;
//# sourceMappingURL=users.controller.js.map