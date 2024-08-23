import axios from '../utils/axios';
import { User } from '@/types/user';

const friendsService = {
    searchUsers: async (query: string): Promise<User[]> => {
        const response = await axios.get(`/users/search?query=${query}`);
        return response.data;
    },

    addFriend: async (friendTag: string): Promise<User> => {
        const response = await axios.post('/users/friends/add', { friendTag });
        return response.data;
    },

    getFriends: async (): Promise<User[]> => {
        const response = await axios.get('/users/friends');
        return response.data;
    }
};

export default friendsService;
