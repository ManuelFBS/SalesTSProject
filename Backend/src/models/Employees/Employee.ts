import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/db';
import { EmployeeStatus } from './EmployeeStatus.js';

class Employee extends Model {
    public id!: number;
    public dni!: string;
    public name!: string;
    public lastName!: string;
    public birthDate!: Date;
    public email!: string;
    public phone!: string;
    public country!: string;

    // * Método para obtener el estado del empleado...
    public async getEmployeeStatus() {
        return await EmployeeStatus.findOne({
            where: { dni: this.dni },
        });
    }
}

Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        dni: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        birthDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(15),
            unique: true,
            allowNull: false,
        },
        country: { type: DataTypes.STRING },
    },
    {
        sequelize,
        modelName: 'Employee',
        tableName: 'employees',
        timestamps: false,
    },
);

// Employee.hasOne(EmployeeStatus, {
//     foreignKey: 'dni',
//     sourceKey: 'dni',
//     as: 'employyeStatus',
// });

export default Employee;
