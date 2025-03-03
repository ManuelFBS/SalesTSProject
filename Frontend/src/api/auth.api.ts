import { axiosInstance } from './axios.config';
import { AuthResponse, LoginCredentials } from '../types/auth.types';

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>(
            '/auth/login',
            credentials,
        );

        return response.data;
    },

    logout: async (): Promise<void> => {
        await axiosInstance.post('/auth/logout');
    },
};
