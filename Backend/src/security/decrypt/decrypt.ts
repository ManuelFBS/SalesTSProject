import e, {
    Request,
    Response,
    NextFunction,
} from 'express';
import * as bcrypt from 'bcrypt';

export const verifyPassword = async (
    passwordInput: string,
    passwordStoreDB: string,
    next: NextFunction,
) => {
    try {
        const verify = await bcrypt.compare(
            passwordInput,
            passwordStoreDB,
        );

        return verify;
    } catch (error) {
        next(error);
    }
};
