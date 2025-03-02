import { Request, Response, NextFunction } from 'express';
import Employee from '../../models/Employees/Employee.js';
import { EmployeeStatus } from '../../models/Employees/EmployeeStatus.js';
import { Department } from '../../models/Employees/Department.js';
import { User } from '../../models/index.js';
import sequelize from '../../config/db.js';
import { convertToMySQLDate } from '../../utils/Dates-Times/DateFormatter.js';

// ~ Se crea un nuevo empleado...
export const createNewEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const {
            dni,
            name,
            lastName,
            birthDate,
            email,
            phone,
            country,
            statusWork,
            department,
            position,
        } = req.body;

        // * Formatear fecha...
        const formattedBirthDate =
            convertToMySQLDate(birthDate);

        // * Validar conversión de fecha...
        if (!formattedBirthDate) {
            return res.status(400).json({
                error: 'Fecha de nacimiento inválida',
                message:
                    'Por favor, use el formato DD/MM/YYYY',
            });
        }

        const transaction = await sequelize.transaction();

        try {
            // * Se crea el empleado...
            const newEmployee = await Employee.create(
                {
                    dni,
                    name,
                    lastName,
                    birthDate: formattedBirthDate,
                    email,
                    phone,
                    country,
                },
                { transaction },
            );

            // * Se crea el status del empleado...
            await EmployeeStatus.create(
                {
                    dni: newEmployee.dni,
                    statusWork,
                },
                { transaction },
            );

            // * Se crea el departamento y cargo del nuevo empleado...
            await Department.create(
                {
                    dni: newEmployee.dni,
                    department,
                    position,
                },
                { transaction },
            );

            // * Se confirma la transacción...
            await transaction.commit();

            // * Respuesta exitosa...
            res.status(201).json({
                message:
                    'Employee created successfully...!!!',
                ID: newEmployee.id,
                DNI: newEmployee.dni,
                Nombres: newEmployee.name,
                Apellidos: newEmployee.lastName,
                FechaNacimiento: birthDate, // > Fecha original del input...
                FechaNacimientoFormateada:
                    formattedBirthDate, // > Fecha en formato MySQL...
                Email: newEmployee.email,
                Telefono: newEmployee.phone,
                Pais: newEmployee.country,
                EstadoLaboral: statusWork,
                Departamento: department,
                Cargo: position,
            });
        } catch (error) {
            // * Se revierte la transacción en caso de error...
            await transaction.rollback();
            throw error;
        }
    } catch (error) {
        next(error);
    }
};

// ~ Se obtienen todos los empleados...
export const getAllEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const allEmployees = await Employee.findAll();

        if (!allEmployees) {
            res.status(404).json({
                message:
                    'No hay ningún empleado registrado en la Base de datos...!',
            });
        }

        res.status(200).json(allEmployees);
    } catch (error) {
        next(error);
    }
};

// ~ Se obtiene un empleado determinado...
export const getEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { dni } = req.params;

    try {
        const employee = await Employee.findOne({
            where: { dni }, // > Búsqueda por DNI...
            include: [
                {
                    model: Department,
                    attributes: ['department', 'position'], // > Solo se incluyen estos campos...
                },
                {
                    model: User,
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
    } catch (error) {
        next(error);
    }
};

// ~ Se actualizan los datos de un empleado...
export const updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { body } = req;
    const { dni } = req.params;

    try {
        const employeeToBeUpdate = await Employee.findOne({
            where: { dni },
        });

        if (employeeToBeUpdate) {
            await employeeToBeUpdate.update(body);

            res.status(201).json({
                message: `El Usuario con la id: ${dni} ha sido actualizado satisfactoriamente...!!!`,
                employeeToBeUpdate,
            });
        } else {
            res.status(404).json({
                message: `No existe ningún Usuario con la ID: ${dni}`,
            });
        }
    } catch (error) {
        next(error);
    }
};
