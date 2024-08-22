import axios from '../utils/axios';

const authService = {
    register: (userData: { username: string; email: string; password: string }) => {
        return axios.post('/auth/register', userData);
    },
    login: (credentials: { email: string; password: string }) => {
        return axios.post('/auth/login', credentials);
    },
    getCurrentUser: () => {
        return axios.get('/auth/me');
    },
};

export default authService;
