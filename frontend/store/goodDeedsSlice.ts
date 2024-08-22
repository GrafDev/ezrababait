import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../utils/axios';
import { GoodDeed } from '@/types/goodDeed';

interface GoodDeedsState {
    goodDeeds: GoodDeed[];
    isLoading: boolean;
    error: string | null;
}

const initialState: GoodDeedsState = {
    goodDeeds: [],
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

const goodDeedsSlice = createSlice({
    name: 'goodDeeds',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoodDeeds.pending, (state) => {
                state.isLoading = true;
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
            });
    },
});

export default goodDeedsSlice.reducer;
