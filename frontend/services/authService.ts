// services/authService.ts
import axios from '../utils/axios';

const authService = {
    register: (userData: { username: string; email: string; password: string; friendTag: string }) => {
        return axios.post('/auth/register', userData);
    },
    login: (credentials: { username: string; password: string }) => {
        return axios.post('/auth/login', credentials);
    },
};

export default authService;
