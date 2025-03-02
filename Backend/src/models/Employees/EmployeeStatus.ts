import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/db';

class EmployeeStatus extends Model {
    public id!: number;
    public dni!: string;
    public statusWork!:
        | 'Activo'
        | 'Vacaciones'
        | 'Permiso Laboral'
        | 'Reposo Médico'
        | 'Suspendido'
        | 'Desincorporado';
    public statusUser!: number;
}

EmployeeStatus.init(
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
        statusWork: {
            type: DataTypes.ENUM(
                'Activo',
                'Vacaciones',
                'Permiso Laboral',
                'Reposo Médico',
                'Suspendido',
                'Desincorporado',
            ),
            defaultValue: 'Activo',
        },
        statusUser: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
        },
    },
    {
        sequelize,
        modelName: 'EmployeeStatus',
        tableName: 'employeesStatus',
        timestamps: false,
    },
);

// ~ Importación dinámica para evitar referencia circular...
export default async function setupEmployeeStatusRelations() {
    const { default: Employee } = await import(
        './Employee.js'
    );
    EmployeeStatus.belongsTo(Employee, {
        foreignKey: 'dni',
        targetKey: 'dni',
    });
}

export { EmployeeStatus };
