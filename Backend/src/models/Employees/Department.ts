import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/db';

class Department extends Model {
    public id!: number;
    public dni!: string;
    public department!: string;
    public position!: string;
}

Department.init(
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
        department: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Department',
        tableName: 'departments',
        timestamps: false,
    },
);

// ~ Función para configurar relaciones de Department...
export default async function setupDepartmentRelations() {
    const { default: Employee } = await import(
        './Employee.js'
    );
    Department.belongsTo(Employee, {
        foreignKey: 'dni',
        targetKey: 'dni',
    });
}

export { Department };
