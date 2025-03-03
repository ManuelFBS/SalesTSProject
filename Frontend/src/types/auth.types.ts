export interface LoginCredentials {
    user: string;
    password: string;
}

export interface User {
    id: number;
    dni: string;
    role: 'Admin' | 'Owner' | 'Employee';
}

export interface AuthResponse {
    token: string;
    user: User;
}
