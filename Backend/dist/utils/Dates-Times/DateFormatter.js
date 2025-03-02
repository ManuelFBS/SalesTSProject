"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToMySQLDate = void 0;
const date_fns_1 = require("date-fns");
/*
    ~ Función para formatear fechas...
    + Esta función se encarga de darle formato correcto a fechas estandar
    + del tipo "DD/MM/YYYY" (español - latino) al formato "yyyy-MM-dd" el
    + cual es el formato con que se almacena en una BD MySQL...
*/
const convertToMySQLDate = (inputDate) => {
    try {
        // * Parsear la fecha en formato DD/MM/YYYY...
        const parsedDate = (0, date_fns_1.parse)(inputDate, 'dd/MM/yyyy', new Date());
        // * Vericar si la fecha es válida...
        if (!(0, date_fns_1.isValid)(parsedDate)) {
            throw new Error('Invalid date...!');
        }
        // * Formatear para MySQL ('YYYY/MM/DD')...
        return (0, date_fns_1.format)(parsedDate, 'yyyy-MM-dd');
    }
    catch (error) {
        console.error('Error en conversión de fecha:', error);
        return null;
    }
};
exports.convertToMySQLDate = convertToMySQLDate;
//# sourceMappingURL=DateFormatter.js.map