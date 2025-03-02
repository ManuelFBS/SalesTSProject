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
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../../config/db"));
const EmployeeStatus_js_1 = require("./EmployeeStatus.js");
class Employee extends sequelize_1.Model {
    // * Método para obtener el estado del empleado...
    getEmployeeStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield EmployeeStatus_js_1.EmployeeStatus.findOne({
                where: { dni: this.dni },
            });
        });
    }
}
Employee.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    dni: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    birthDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(15),
        unique: true,
        allowNull: false,
    },
    country: { type: sequelize_1.DataTypes.STRING },
}, {
    sequelize: db_1.default,
    modelName: 'Employee',
    tableName: 'employees',
    timestamps: false,
});
// Employee.hasOne(EmployeeStatus, {
//     foreignKey: 'dni',
//     sourceKey: 'dni',
//     as: 'employyeStatus',
// });
exports.default = Employee;
//# sourceMappingURL=Employee.js.map