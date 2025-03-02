import { Request, Response, NextFunction } from 'express';
import {
    Employee,
    EmployeeStatus,
    User,
} from '../../models/index.js';
import { verifyPassword } from '../../security/decrypt/decrypt.js';
import { USER_STATUS } from '../../libs/Const.js';
import { generateToken } from '../../security/tokens/jwt.js';

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { user, password } = req.body;

    try {
        // * Se busca el usuario...
        const userRecord = await User.findOne({
            where: { user },
            include: [
                {
                    model: Employee,
                    include: [EmployeeStatus],
                },
            ],
        });

        if (!userRecord) {
            return res.status(404).json({
                message: 'Credenciales inválidas',
            });
        }

        // * Se verifica el password...
        const isValidPassword = await verifyPassword(
            password,
            userRecord.password,
            next,
        );

        if (!isValidPassword) {
            return res.status(401).json({
                message: 'Contraseña incorrecta',
            });
        }

        // * Acceder al estado del empleado de manera más directa...
        const employeeStatus =
            await userRecord.Employee?.getEmployeeStatus();

        if (
            employeeStatus?.statusUser ===
            USER_STATUS.BLOCKED
        ) {
            return res.status(403).json({
                message: 'Usuario bloqueado...!!!',
            });
        } else if (
            employeeStatus?.statusUser ===
            USER_STATUS.DELETED
        ) {
            return res.status(403).json({
                message: 'Usuario bloqueado...!!!',
            });
        }

        // * Generar token JWT - Pasamos el usuario completo...
        const token = generateToken(userRecord);

        res.json({
            token,
            user: {
                id: userRecord.id,
                dni: userRecord.dni,
                role: userRecord.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const logout = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        if (!res.cookie) {
            res.status(400).json({
                message:
                    'No hay ninguna sessión activa...!!!',
            });
        }

        res.clearCookie('token');
        res.status(200).json({ message: 'Logout exitoso' });
    } catch (error) {
        next(error);
    }
};
