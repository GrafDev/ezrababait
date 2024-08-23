import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import friendsService from '../services/friendsService';
import { User } from '@/types/user';
import axios, { AxiosError } from 'axios';

interface FriendsState {
    friends: User[];
    isLoading: boolean;
    error: string | null;
}

const initialState: FriendsState = {
    friends: [],
    isLoading: false,
    error: null,
};

export const searchUsers = createAsyncThunk(
    'friends/searchUsers',
    async (query: string, { rejectWithValue }) => {
        try {
            return await friendsService.searchUsers(query);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || 'An error occurred during search');
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

export const addFriend = createAsyncThunk(
    'friends/addFriend',
    async (friendTag: string, { rejectWithValue }) => {
        try {
            return await friendsService.addFriend(friendTag);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || 'An error occurred while adding friend');
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

export const getFriends = createAsyncThunk(
    'friends/getFriends',
    async (_, { rejectWithValue }) => {
        try {
            return await friendsService.getFriends();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || 'An error occurred while fetching friends');
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFriends.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getFriends.fulfilled, (state, action) => {
                state.isLoading = false;
                state.friends = action.payload;
                state.error = null;
            })
            .addCase(getFriends.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(addFriend.fulfilled, (state, action) => {
                state.friends.push(action.payload);
                state.error = null;
            })
            .addCase(addFriend.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(searchUsers.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export default friendsSlice.reducer;
