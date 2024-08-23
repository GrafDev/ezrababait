import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../utils/axios';
import { GoodDeed } from '@/types/goodDeed';

interface GoodDeedsState {
    goodDeeds: GoodDeed[];
    friendGoodDeeds: GoodDeed[];
    isLoading: boolean;
    error: string | null;
}

const initialState: GoodDeedsState = {
    goodDeeds: [],
    friendGoodDeeds: [],
    isLoading: false,
    error: null,
};

export const fetchGoodDeeds = createAsyncThunk(
    'goodDeeds/fetchGoodDeeds',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/good-deeds');
            return response.data;
        } catch (error) {
            return rejectWithValue('Failed to fetch good deeds');
        }
    }
);

export const addGoodDeed = createAsyncThunk(
    'goodDeeds/addGoodDeed',
    async (goodDeed: { title: string; description: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/good-deeds', goodDeed);
            return response.data;
        } catch (error) {
            return rejectWithValue('Failed to add good deed');
        }
    }
);

export const fetchFriendGoodDeeds = createAsyncThunk(
    'goodDeeds/fetchFriendGoodDeeds',
    async (friendId: number, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/good-deeds/friend/${friendId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue('Failed to fetch friend\'s good deeds');
        }
    }
);

export const completeGoodDeed = createAsyncThunk(
    'goodDeeds/completeGoodDeed',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`/good-deeds/${id}/complete`);
            return response.data;
        } catch (error) {
            return rejectWithValue('Failed to complete good deed');
        }
    }
);

const goodDeedsSlice = createSlice({
    name: 'goodDeeds',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoodDeeds.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchGoodDeeds.fulfilled, (state, action: PayloadAction<GoodDeed[]>) => {
                state.isLoading = false;
                state.goodDeeds = action.payload;
            })
            .addCase(fetchGoodDeeds.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(addGoodDeed.fulfilled, (state, action: PayloadAction<GoodDeed>) => {
                state.goodDeeds.push(action.payload);
            })
            .addCase(fetchFriendGoodDeeds.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchFriendGoodDeeds.fulfilled, (state, action: PayloadAction<GoodDeed[]>) => {
                state.isLoading = false;
                state.friendGoodDeeds = action.payload;
            })
            .addCase(fetchFriendGoodDeeds.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(completeGoodDeed.fulfilled, (state, action: PayloadAction<GoodDeed>) => {
                const index = state.goodDeeds.findIndex(deed => deed.id === action.payload.id);
                if (index !== -1) {
                    state.goodDeeds[index] = action.payload;
                }
            });
    },
});

export default goodDeedsSlice.reducer;
