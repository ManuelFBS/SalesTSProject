export interface LoginCredentials {
    user: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: number;
        dni: string;
        role: string;
    };
}

export interface User {
    id: number;
    dni: string;
    role: string;
}
