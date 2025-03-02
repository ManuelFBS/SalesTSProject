"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRouter = void 0;
const express_1 = __importDefault(require("express"));
const employees_controller_js_1 = require("../../controllers/EmployeesControllers/employees.controller.js");
const authMiddleware_js_1 = require("../../middlewares/authMiddlewares/authMiddleware.js");
const validateEmployee_js_1 = require("../../middlewares/employees/validateEmployee.js");
const employeeRouter = express_1.default.Router();
exports.employeeRouter = employeeRouter;
// * Función wrapper para manejar promesas...
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
employeeRouter.post("/employee/new", asyncHandler((0, authMiddleware_js_1.authorizeRoles)(["Owner", "Admin"])), validateEmployee_js_1.validateEmployee, asyncHandler(employees_controller_js_1.createNewEmployee));
employeeRouter.get("/", asyncHandler((0, authMiddleware_js_1.authorizeRoles)(["Owner", "Admin"])), employees_controller_js_1.getAllEmployees);
employeeRouter.get("/employee/:dni", asyncHandler((0, authMiddleware_js_1.authorizeRoles)(["Owner", "Admin"])), employees_controller_js_1.getEmployee);
employeeRouter.patch("/employee/edit/:dni", asyncHandler((0, authMiddleware_js_1.authorizeRoles)(["Owner", "Admin"])), employees_controller_js_1.updateEmployee);
//# sourceMappingURL=employee.routes.js.map