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
const app_js_1 = __importDefault(require("./app.js"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // * Iniciar el servidor...
            app_js_1.default.listen(app_js_1.default.get('port'), () => {
                console.log(`NODE Server is running on port: ${app_js_1.default.get('port')}`);
            });
            // * Manejar señal de apagado (SIGINT o SIGTERM)
            process.on('SIGINT', () => __awaiter(this, void 0, void 0, function* () {
                try {
                    console.log('Received SIGINT signal, shutting down...');
                    // ! await mysql2.connection.close();
                    console.log('MySQL connection closed...');
                    process.exit(0); // > Salir del proceso exitosamente...
                }
                catch (error) {
                    console.error('Error closing MySQL connection:', error);
                    process.exit(1); // > Salir con error
                }
            }));
        }
        catch (error) {
            console.error('Error initializing application:', error);
            process.exit(1); // > Salir con error en caso de fallo crítico...
        }
    });
}
// * Ejecutar la aplicación...
main();
//# sourceMappingURL=index.js.map