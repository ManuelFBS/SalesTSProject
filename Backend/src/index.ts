import app from './app.js';

async function main() {
    try {
        // * Iniciar el servidor...
        app.listen(app.get('port'), () => {
            console.log(`NODE Server is running on port: ${app.get('port')}`);
        });

        // * Manejar señal de apagado (SIGINT o SIGTERM)
        process.on('SIGINT', async () => {
            try {
                console.log('Received SIGINT signal, shutting down...');
                // ! await mysql2.connection.close();
                console.log('MySQL connection closed...');
                process.exit(0); // > Salir del proceso exitosamente...
            } catch (error) {
                console.error('Error closing MySQL connection:', error);
                process.exit(1); // > Salir con error
            }
        });
    } catch (error) {
        console.error('Error initializing application:', error);
        process.exit(1); // > Salir con error en caso de fallo crítico...
    }
}

// * Ejecutar la aplicación...
main();
