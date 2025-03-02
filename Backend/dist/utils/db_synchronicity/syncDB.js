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
const db_js_1 = __importDefault(require("../../config/db.js"));
const index_js_1 = require("../../models/index.js");
const syncDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // * Configurar todas las relaciones...
        yield (0, index_js_1.setupRelations)();
        // * Sincroniza la base de datos y crea la tabla si no existe...
        // await sequelize.sync({ force: true });
        yield db_js_1.default.sync({ force: process.env.NODE_ENV === 'development' });
        console.log('Base de datos y tabla creadas exitosamente.');
    }
    catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
});
exports.default = syncDatabase;
//# sourceMappingURL=syncDB.js.map