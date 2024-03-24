import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


import {searchService} from "../../servises/axiosService";
import {MovieApiResponse} from "../../interfaces/responseInterfaces";



export interface SearchState {
    query: string;
    page: number;
    totalPages: number;
    movies: MovieApiResponse | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: SearchState = {
    query: '',
    page: 1,
    totalPages: 0,
    movies: null,
    status: 'idle',
    error: null,
};



export const fetchMovies = createAsyncThunk<
    { movies: MovieApiResponse; totalPages: number; currentPage: number },
    { query: string; page: number }
>(
    'search/fetchMovies',
    async ({ query, page }, { rejectWithValue }) => {
        try {
            const { data } = await searchService.getAll(query, page);
            return {
                movies: data,
                totalPages: data.total_pages,
                currentPage: page,
            };
        } catch (error) {
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
                state.status = 'loading';
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload.movies;
                state.totalPages = action.payload.totalPages;
                state.page = action.payload.currentPage;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { setQuery, setPage } = searchSlice.actions;

export default searchSlice.reducer;
