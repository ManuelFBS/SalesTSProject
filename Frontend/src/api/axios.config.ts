import axios from 'axios';

export const baseURL = 'http//localhost:3001/api';

export const axiosInstance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
});

export const axiosPrivate = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

// ~ Interceptor para añadir el token a las peticiones...
axiosPrivate.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
