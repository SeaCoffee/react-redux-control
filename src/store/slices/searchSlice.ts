import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


import {searchService} from "../../servises/axiosService";
import {MovieApiResponse} from "../../interfaces/responseInterfaces";



export interface SearchState {
    query: string;
    page: number;
    movies: MovieApiResponse | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}


const initialState: SearchState = {
    query: '',
    page: 1,
    movies: null,
    status: 'idle',
    error: null,
};


export const fetchMovies = createAsyncThunk<MovieApiResponse, { query: string; page: number }>(
    'search/fetchMovies',
    async ({ query, page }, { rejectWithValue }) => {
        try {
            const { data } = await searchService.getAll(query, page);
            console.log("Data received in fetchMovies:", data);
            return data;
        } catch (error) {
            console.error("Error in fetchMovies:", error);
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue('An unexpected error occurred');
            }
        }
    }
);


const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                console.log("fetchMovies pending");
                state.status = 'loading';
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload;
            })

            .addCase(fetchMovies.rejected, (state, action) => {
                console.error("fetchMovies rejected, action:", action);
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },

});

export const { setQuery, setPage } = searchSlice.actions;

export default searchSlice.reducer;
