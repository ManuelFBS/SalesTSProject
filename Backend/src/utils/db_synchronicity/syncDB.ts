import sequelize from '../../config/db.js';
import { setupRelations } from '../../models/index.js';

const syncDatabase = async () => {
    try {
        // * Configurar todas las relaciones...
        await setupRelations();

        // * Sincroniza la base de datos y crea la tabla si no existe...
        // await sequelize.sync({ force: true });
        await sequelize.sync({ force: process.env.NODE_ENV === 'development' });
        console.log('Base de datos y tabla creadas exitosamente.');
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
};

export default syncDatabase;
