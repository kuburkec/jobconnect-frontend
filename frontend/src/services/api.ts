import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    const lang = localStorage.getItem('i18nextLng') || 'en';
    if (token) config.headers.Authorization = `Bearer ${token}`;
    config.headers['Accept-Language'] = lang;
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('userType');
            window.location.href = '/auth';
        }
        return Promise.reject(error);
    }
);

export default api;