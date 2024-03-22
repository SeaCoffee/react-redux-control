import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {moviesService, genresService, searchService} from "../../servises/axiosService";
import {Movie} from "../../interfaces/responseInterfaces";



export type MoviesState = {
    movies: Movie[];
    currentMovie: Movie | null;
    currentMovieStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: MoviesState = {
    movies: [],
    currentMovie: null,
    currentMovieStatus: 'idle',
    status: 'idle',
    error: null,
};


export const fetchMovies = createAsyncThunk<Movie[], { page?: number, genreId?: number, searchTerm?: string }, { rejectValue: string }>(
    'movies/fetchMovies',
    async ({ page = 1, genreId, searchTerm }, { rejectWithValue }) => {
        try {
            let response;
            if (genreId) {
                response = await genresService.getMoviesByGenre(genreId, page);
            } else if (searchTerm) {
                response = await searchService.getAll(searchTerm, page);
            } else {
                response = await moviesService.getAll(page);
            }
            return response.data.results;
        } catch (error) {
            return rejectWithValue('An error occurred while loading movies');
        }
    }
);

export const fetchMovie = createAsyncThunk<Movie, number, { rejectValue: string }>(
    'movies/fetchMovie',
    async (movieId, { rejectWithValue }) => {
        try {
            const response = await moviesService.byId(movieId);
            return response.data;
        } catch (error) {
            return rejectWithValue('An error occurred while loading the movie details');
        }
    }
);
const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(fetchMovie.pending, (state) => {
                state.currentMovieStatus = 'loading';
            })
            .addCase(fetchMovie.fulfilled, (state, action) => {
                state.currentMovieStatus = 'succeeded';
                state.currentMovie = action.payload;
            })
            .addCase(fetchMovie.rejected, (state, action) => {
                state.currentMovieStatus = 'failed';
                state.error = action.payload as string;
            });
    },
});
export default moviesSlice.reducer;

