import { Request, Response, NextFunction } from 'express';
import Employee from '../../models/Employees/Employee.js';
import { User } from '../../models/Users/User.js';
import { userSchema } from '../../validations/users/usersSchema.js';
import { encrypted } from '../../security/encrypt/encrypting.js';

export const createNewUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        // * Validar los datos de entrada...
        const validation = userSchema.safeParse(req.body);

        if (!validation.success) {
            return res
                .status(400)
                .json({ errors: validation.error.errors });
        }

        const { dni, user, password, role } =
            validation.data;

        const employee = await Employee.findOne({
            where: { dni },
        });

        if (!employee) {
            return res
                .status(404)
                .json({ message: 'Employee not found' });
        }

        // * Se procede a la encriptación del password...
        const hashedPassword = await encrypted(password);

        // * Se crea el nuevo usuario...
        const newUser = await User.create({
            dni,
            user,
            password: hashedPassword,
            role,
        });

        // req.user = {
        //     id: newUser.id,
        //     dni: newUser.dni,
        //     role: newUser.role,
        // };

        res.status(201).json({
            message: `El usuario: ${user} ha sido creado satisfactoriamente...!`,
            newUser,
        });
    } catch (error) {
        next(error);
    }
};
