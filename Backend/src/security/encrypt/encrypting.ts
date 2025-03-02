import bcrypt from 'bcrypt';

const jumps: number = 10;

// ~ Encriptador
export const encrypted = async (
    password: string,
): Promise<string> => {
    return await bcrypt.hash(password, jumps);
};

/*
// ~ Desencriptador...
export const decrypted = async (
    password: string,
    hash: string,
): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};
*/
