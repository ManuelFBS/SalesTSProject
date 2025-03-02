import { parse, format, isValid } from 'date-fns';

/* 
    ~ Función para formatear fechas...
    + Esta función se encarga de darle formato correcto a fechas estandar
    + del tipo "DD/MM/YYYY" (español - latino) al formato "yyyy-MM-dd" el
    + cual es el formato con que se almacena en una BD MySQL...
*/
const convertToMySQLDate = (inputDate: string): string | null => {
    try {
        // * Parsear la fecha en formato DD/MM/YYYY...
        const parsedDate = parse(inputDate, 'dd/MM/yyyy', new Date());

        // * Vericar si la fecha es válida...
        if (!isValid(parsedDate)) {
            throw new Error('Invalid date...!');
        }

        // * Formatear para MySQL ('YYYY/MM/DD')...
        return format(parsedDate, 'yyyy-MM-dd');
    } catch (error) {
        console.error('Error en conversión de fecha:', error);
        return null;
    }
};

export { convertToMySQLDate };
