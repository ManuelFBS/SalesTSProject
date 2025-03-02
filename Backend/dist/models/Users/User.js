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
exports.User = void 0;
exports.default = setupUserRelations;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../config/db"));
const index_js_1 = require("../index.js");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    dni: { type: sequelize_1.DataTypes.STRING, unique: true },
    user: { type: sequelize_1.DataTypes.STRING(15), unique: true },
    password: { type: sequelize_1.DataTypes.STRING },
    role: {
        type: sequelize_1.DataTypes.ENUM('Owner', 'Admin', 'Employee'),
    },
}, {
    sequelize: db_1.default,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
});
// ~ Importación dinámica para evitar referencia circular...
function setupUserRelations() {
    return __awaiter(this, void 0, void 0, function* () {
        // const { default: Employee } = await import(
        //     '../Employees/Employee.js'
        // );
        User.belongsTo(index_js_1.Employee, {
            foreignKey: 'dni',
            targetKey: 'dni',
        });
    });
}
//# sourceMappingURL=User.js.map