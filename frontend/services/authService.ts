import axios from '../utils/axios';

const authService = {
    register: (userData: { username: string; email: string; password: string; friendTag: string }) => {
        return axios.post('/auth/register', userData);
    },
    login: (credentials: { username: string; password: string }) => {
        return axios.post('/auth/login', credentials);
    },
    getCurrentUser: () => {
        return axios.get('/auth/me');
    },
};

export default authService;
