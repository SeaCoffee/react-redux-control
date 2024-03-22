import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';


import { Box, Grid, Typography } from '@mui/material';

import {fetchMovies} from "../../store/slices/searchSlice";
import {RootState} from "../../store/store";
import {useAppDispatch} from "../../hooks/appDispatchHook";
import {MoviesListCard} from "../MovieListCardComponent/MovieListCardComponent";
import {useTheme} from "../../contexts/ThemeContext";


export const SearchResults = () => {
    const { query, page, movies, status, error } = useSelector((state: RootState) => state.search);
    const dispatch = useAppDispatch();
    const { theme } = useTheme();

    useEffect(() => {
        if (query) {
            dispatch(fetchMovies({ query, page }));
        }
    }, [query, page, dispatch]);

    if (status === 'loading') {
        return <Typography>Loading...</Typography>;
    }
    if (status === 'failed') {
        return <Typography>Error: {error}</Typography>;
    }
    if (status === 'succeeded' && (!movies || movies.results.length === 0)) {
        return <Typography>No movies found</Typography>;
    }

    return (
        <Box sx={{ bgcolor: theme === 'light' ? 'white' : 'black', color: theme === 'light' ? 'black' : 'white' }}>
            <Grid container spacing={2}>
                {movies?.results.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={movie.id}>
                        <MoviesListCard movie={movie} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

