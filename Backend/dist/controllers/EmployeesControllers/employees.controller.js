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
exports.updateEmployee = exports.getEmployee = exports.getAllEmployees = exports.createNewEmployee = void 0;
const Employee_js_1 = __importDefault(require("../../models/Employees/Employee.js"));
const EmployeeStatus_js_1 = require("../../models/Employees/EmployeeStatus.js");
const Department_js_1 = require("../../models/Employees/Department.js");
const index_js_1 = require("../../models/index.js");
const db_js_1 = __importDefault(require("../../config/db.js"));
const DateFormatter_js_1 = require("../../utils/Dates-Times/DateFormatter.js");
// ~ Se crea un nuevo empleado...
const createNewEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dni, name, lastName, birthDate, email, phone, country, statusWork, department, position, } = req.body;
        // * Formatear fecha...
        const formattedBirthDate = (0, DateFormatter_js_1.convertToMySQLDate)(birthDate);
        // * Validar conversión de fecha...
        if (!formattedBirthDate) {
            return res.status(400).json({
                error: 'Fecha de nacimiento inválida',
                message: 'Por favor, use el formato DD/MM/YYYY',
            });
        }
        const transaction = yield db_js_1.default.transaction();
        try {
            // * Se crea el empleado...
            const newEmployee = yield Employee_js_1.default.create({
                dni,
                name,
                lastName,
                birthDate: formattedBirthDate,
                email,
                phone,
                country,
            }, { transaction });
            // * Se crea el status del empleado...
            yield EmployeeStatus_js_1.EmployeeStatus.create({
                dni: newEmployee.dni,
                statusWork,
            }, { transaction });
            // * Se crea el departamento y cargo del nuevo empleado...
            yield Department_js_1.Department.create({
                dni: newEmployee.dni,
                department,
                position,
            }, { transaction });
            // * Se confirma la transacción...
            yield transaction.commit();
            // * Respuesta exitosa...
            res.status(201).json({
                message: 'Employee created successfully...!!!',
                ID: newEmployee.id,
                DNI: newEmployee.dni,
                Nombres: newEmployee.name,
                Apellidos: newEmployee.lastName,
                FechaNacimiento: birthDate, // > Fecha original del input...
                FechaNacimientoFormateada: formattedBirthDate, // > Fecha en formato MySQL...
                Email: newEmployee.email,
                Telefono: newEmployee.phone,
                Pais: newEmployee.country,
                EstadoLaboral: statusWork,
                Departamento: department,
                Cargo: position,
            });
        }
        catch (error) {
            // * Se revierte la transacción en caso de error...
            yield transaction.rollback();
            throw error;
        }
    }
    catch (error) {
        next(error);
    }
});
exports.createNewEmployee = createNewEmployee;
// ~ Se obtienen todos los empleados...
const getAllEmployees = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allEmployees = yield Employee_js_1.default.findAll();
        if (!allEmployees) {
            res.status(404).json({
                message: 'No hay ningún empleado registrado en la Base de datos...!',
            });
        }
        res.status(200).json(allEmployees);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllEmployees = getAllEmployees;
// ~ Se obtiene un empleado determinado...
const getEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    try {
        const employee = yield Employee_js_1.default.findOne({
            where: { dni }, // > Búsqueda por DNI...
            include: [
                {
                    model: Department_js_1.Department,
                    attributes: ['department', 'position'], // > Solo se incluyen estos campos...
                },
                {
                    model: index_js_1.User,
                    attributes: ['user', 'role'],
                },
            ],
        });
        if (!employee) {
            res.status(404).json({
                message: `No existe ningún empleado con el DNI: ${dni}`,
            });
        }
        res.status(200).json({
            message: 'Empleado encontrado:',
            employee,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getEmployee = getEmployee;
// ~ Se actualizan los datos de un empleado...
const updateEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { dni } = req.params;
    try {
        const employeeToBeUpdate = yield Employee_js_1.default.findOne({
            where: { dni },
        });
        if (employeeToBeUpdate) {
            yield employeeToBeUpdate.update(body);
            res.status(201).json({
                message: `El Usuario con la id: ${dni} ha sido actualizado satisfactoriamente...!!!`,
                employeeToBeUpdate,
            });
        }
        else {
            res.status(404).json({
                message: `No existe ningún Usuario con la ID: ${dni}`,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateEmployee = updateEmployee;
//# sourceMappingURL=employees.controller.js.map