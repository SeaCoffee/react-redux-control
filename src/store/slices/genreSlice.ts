import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


import {Genre} from "../../interfaces/responseInterfaces";
import {genresService} from "../../servises/axiosService";


type GenresState = {
    genres: Genre[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: GenresState = {
    genres: [],
    status: 'idle',
    error: null,
};


export const fetchGenres = createAsyncThunk<Genre[], void, { rejectValue: string }>(
    'genres/fetchGenres',
    async (_, { rejectWithValue }) => {
        try {
            const response = await genresService.getAll();
            console.log('fetchGenres response:', response);
            return response.data.genres;
        } catch (error) {
            console.error('fetchGenres error:', error);
            return rejectWithValue('An error occurred while loading genres');
        }
    }
);


const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenres.pending, (state) => {
                console.log('Loading genres...');
                state.status = 'loading';
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                console.log('Genres loaded:', action.payload);
                state.status = 'succeeded';
                state.genres = action.payload;
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                console.log('Failed to load genres:', action.payload);

              state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});
export default genresSlice.reducer;
