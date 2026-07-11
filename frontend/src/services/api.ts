import axios from 'axios';

// 1. Create a single, correctly named lowercase 'api' instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
});

// 2. Attach the token and language headers automatically to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    const lang = localStorage.getItem('i18nextLng') || 'en';
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Accept-Language'] = lang;
    return config;
});

// 3. Handle 401 Unauthorized errors automatically (kick user out to login)
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

// 4. Export it safely
export default api;