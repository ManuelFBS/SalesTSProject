"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.User = exports.Department = exports.EmployeeStatus = exports.Employee = exports.sequelize = void 0;
exports.setupRelations = setupRelations;
const db_1 = __importDefault(require("../config/db"));
exports.sequelize = db_1.default;
const Employee_js_1 = __importDefault(require("./Employees/Employee.js"));
exports.Employee = Employee_js_1.default;
const EmployeeStatus_js_1 = require("./Employees/EmployeeStatus.js");
Object.defineProperty(exports, "EmployeeStatus", { enumerable: true, get: function () { return EmployeeStatus_js_1.EmployeeStatus; } });
const Department_js_1 = require("./Employees/Department.js");
Object.defineProperty(exports, "Department", { enumerable: true, get: function () { return Department_js_1.Department; } });
const User_js_1 = require("./Users/User.js");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_js_1.User; } });
// ~ Función para configurar todas las relaciones...
function setupRelations() {
    return __awaiter(this, void 0, void 0, function* () {
        // * Configurar relaciones de EmployeeStatus...
        const setupEmployeeStatusRelations = yield Promise.resolve().then(() => __importStar(require('./Employees/EmployeeStatus.js')));
        yield setupEmployeeStatusRelations.default();
        const setupDepartmentRelations = yield Promise.resolve().then(() => __importStar(require('./Employees/Department.js')));
        yield setupDepartmentRelations.default();
        const setupUserRelations = yield Promise.resolve().then(() => __importStar(require('./Users/User.js')));
        yield setupUserRelations.default();
        // * Relaciones desde Employee...
        Employee_js_1.default.hasOne(EmployeeStatus_js_1.EmployeeStatus, {
            foreignKey: 'dni',
            sourceKey: 'dni',
        });
        Employee_js_1.default.hasOne(Department_js_1.Department, {
            foreignKey: 'dni',
            sourceKey: 'dni',
        });
        Employee_js_1.default.hasOne(User_js_1.User, {
            foreignKey: 'dni',
            sourceKey: 'dni',
        });
    });
}
//# sourceMappingURL=index.js.map