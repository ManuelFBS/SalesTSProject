import express from 'express';
import {
    login,
    logout,
} from '../../authentication/auth/auths.controller.js';
import { authMiddleware } from '../../middlewares/authMiddlewares/authMiddleware.js';

const logRouter = express.Router();

// * Función wrapper para manejar promesas...
const asyncHandler =
    (fn: any) => (req: any, res: any, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

logRouter.post('/login', asyncHandler(login));

logRouter.post(
    '/logout',
    asyncHandler(authMiddleware),
    logout,
);

export { logRouter };
