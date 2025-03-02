import express, {
    Application,
    NextFunction,
    Request,
    Response,
} from 'express';
import cookieParser from 'cookie-parser';
import { conditionalCsrfProtection } from './security/csrf/csrf.js';
import { csrfErrorHandler } from './security/csrf/csrf.js';
import dotenv from 'dotenv';
import syncDatabase from './utils/db_synchronicity/syncDB.js';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './middlewares/Errors/handleError.js';
import {
    employeeRouter,
    logRouter,
    userRouter,
} from './routes/index.js';
import { authMiddleware } from './middlewares/authMiddlewares/authMiddleware.js';
import { testRouter } from './routes/testingRoutes/test.routes.js';

const app: Application = express();

dotenv.config();

// * Settings...
app.set('port', process.env.PORT || 8585 || 3070);

// * Middlewares...
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(errorHandler);

// * Iniciando la DB...
const initializeDB = async () => {
    try {
        // > Sincroniza la DB...
        await syncDatabase();
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error(
            'Error synchronizing database:',
            error,
        );
        process.exit(1); // > Salir con error si la sincronización falla...
    }
};
//
initializeDB();

// * Aplicación de protección CSRF (donde sea requerida)...
app.use(conditionalCsrfProtection);

// * Función wrapper para manejar promesas...
const asyncHandler =
    (fn: any) => (req: any, res: any, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

// ? Ruta de testeo...
app.get('/api', (req: Request, res: Response) => {
    res.json({ message: 'Api working...!!!' });
});

// * Para obtener un token CSRF...
app.get('/csrf-token', (req, res) => {
    res.json({
        csrfToken: req.csrfToken ? req.csrfToken() : null,
    });
});

// * Routes (test)...
app.use(
    '/api/test',
    asyncHandler(authMiddleware),
    testRouter,
);

// * Routes...
app.use('/api/auth', logRouter);
app.use(
    '/api/employees',
    asyncHandler(authMiddleware),
    employeeRouter,
);
app.use(
    '/api/users',
    asyncHandler(authMiddleware),
    userRouter,
);

app.use(csrfErrorHandler);

export default app;
