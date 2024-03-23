import {configureStore} from "@reduxjs/toolkit";
import {default as searchReducer} from './slices/searchSlice'
import {default as genresReducer} from './slices/genreSlice'
import {default as moviesReducer} from './slices/moviesListSlice'


export const store = configureStore({
    reducer: {
        search: searchReducer,
        genres: genresReducer,
        movies: moviesReducer,
    }
});

export type  RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

