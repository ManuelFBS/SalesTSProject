import express from 'express';
import { testingAuthentication } from '../../testing/testings.controller.js';

const testRouter = express.Router();

/*
// * Función wrapper para manejar promesas...
    const asyncHandler =
        (fn: any) => (req: any, res: any, next: any) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
*/

testRouter.get('/testing');

export { testRouter };
