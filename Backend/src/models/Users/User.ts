import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/db';
import { Employee } from '../index.js';

class User extends Model {
    public id!: number;
    public dni!: string;
    public user!: string;
    public password!: string;
    public role!: 'Owner' | 'Admin' | 'Employee';
    public Employee?: Employee;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        dni: { type: DataTypes.STRING, unique: true },
        user: { type: DataTypes.STRING(15), unique: true },
        password: { type: DataTypes.STRING },
        role: {
            type: DataTypes.ENUM(
                'Owner',
                'Admin',
                'Employee',
            ),
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false,
    },
);

// ~ Importación dinámica para evitar referencia circular...
export default async function setupUserRelations() {
    // const { default: Employee } = await import(
    //     '../Employees/Employee.js'
    // );
    User.belongsTo(Employee, {
        foreignKey: 'dni',
        targetKey: 'dni',
    });
}

export { User };
