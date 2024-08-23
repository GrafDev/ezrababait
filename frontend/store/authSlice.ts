import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authService from '../services/authService';
import { RootState, AppDispatch } from './index';
import axios from "axios";
import Router from 'next/router';

interface User {
    id: string;
    username: string;
    email: string;
    friendTag: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

interface AuthResponse {
    access_token: string;
    user: User;
}

const getInitialToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

const initialState: AuthState = {
    user: null,
    token: getInitialToken(),
    isLoading: false,
    error: null,
};

export const autoLogin = createAsyncThunk<
    User,
    void,
    { rejectValue: string }
>(
    'auth/autoLogin',
    async (_, { rejectWithValue }) => {
        try {
            const response = await authService.getCurrentUser();
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || 'Failed to auto login');
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

export const login = createAsyncThunk<
    AuthResponse,
    { email: string; password: string },
    { rejectValue: string }
>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await authService.login(credentials);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || 'An error occurred during login');
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

export const register = createAsyncThunk<
    AuthResponse,
    { username: string; email: string; password: string }, // Убрали friendTag отсюда
    { rejectValue: string }
>(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await authService.register(userData);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || 'An error occurred during registration');
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
            }
            Router.push('/login');
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(autoLogin.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(autoLogin.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(autoLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.token = null;
                state.error = action.payload || 'Auto login failed';
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('token');
                }
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.access_token;
                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', action.payload.access_token);
                }
                Router.push('/good-deeds');
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.access_token;
                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', action.payload.access_token);
                }
                Router.push('/good-deeds');
            });
    },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;

export type { AppDispatch };
