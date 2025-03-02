import { User } from '../../models/index.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
// ~ se define una interfaz para el payload del token...
interface TokenPayLoad {
    id: number;
    dni: string;
    role: 'Owner' | 'Admin' | 'Employee';
}

// ~ Variables para el generador y el verificador...
const JWTSEC: string | any = process.env.JWT_SECRET;
const JWTEXP: any = process.env.JWT_EXPIRATION;

// ~ Generador de token...
export const generateToken = (user: User): string => {
    const payload: TokenPayLoad = {
        id: user.id,
        dni: user.dni,
        role: user.role,
    };

    return jwt.sign(payload, JWTSEC, { expiresIn: JWTEXP });
};

// ~ Verificador del token de sessión...
export const verifyToken = (
    token: string,
): TokenPayLoad | null => {
    try {
        return jwt.verify(token, JWTSEC) as TokenPayLoad;
    } catch (error) {
        return null;
    }
};
