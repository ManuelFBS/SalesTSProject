"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    console.error(error);
    res.status(500).json({
        message: 'Ocurrió un error interno',
        error: error.message,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=handleError.js.map