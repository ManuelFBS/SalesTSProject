import express from 'express';
import { createNewUser } from '../../controllers/UsersControllers/users.controller.js';
import {
    authMiddleware,
    authorizeRoles,
} from '../../middlewares/authMiddlewares/authMiddleware.js';
import { validateUser } from '../../middlewares/users/validateUser.js';

const userRouter = express.Router();

// * Función wrapper para manejar promesas...
const asyncHandler =
    (fn: any) => (req: any, res: any, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

userRouter.post(
    '/user/new',
    // > Primero autenticación...
    asyncHandler(authMiddleware),
    // > Luego autorización...
    asyncHandler(authorizeRoles(['Owner'])),
    // > Validación...
    validateUser,
    // > Controlador...
    asyncHandler(createNewUser),
);

export { userRouter };
