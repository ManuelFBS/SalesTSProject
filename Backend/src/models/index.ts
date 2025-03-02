import sequelize from '../config/db';
import Employee from './Employees/Employee.js';
import { EmployeeStatus } from './Employees/EmployeeStatus.js';
import { Department } from './Employees/Department.js';
import { User } from './Users/User.js';

// ~ Función para configurar todas las relaciones...
async function setupRelations() {
    // * Configurar relaciones de EmployeeStatus...
    const setupEmployeeStatusRelations = await import(
        './Employees/EmployeeStatus.js'
    );
    await setupEmployeeStatusRelations.default();

    const setupDepartmentRelations = await import(
        './Employees/Department.js'
    );
    await setupDepartmentRelations.default();

    const setupUserRelations = await import(
        './Users/User.js'
    );
    await setupUserRelations.default();

    // * Relaciones desde Employee...
    Employee.hasOne(EmployeeStatus, {
        foreignKey: 'dni',
        sourceKey: 'dni',
    });
    Employee.hasOne(Department, {
        foreignKey: 'dni',
        sourceKey: 'dni',
    });
    Employee.hasOne(User, {
        foreignKey: 'dni',
        sourceKey: 'dni',
    });
}

export {
    sequelize,
    Employee,
    EmployeeStatus,
    Department,
    User,
    setupRelations,
};
