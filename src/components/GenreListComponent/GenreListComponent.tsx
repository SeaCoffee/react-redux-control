import React from 'react';

import { Box, Grid } from '@mui/material';

import {MoviesListCard} from "../MovieListCardComponent/MovieListCardComponent";
import {useTheme} from "../../contexts/ThemeContext";
import {useAppSelector} from "../../hooks/appDispatchHook";



export const GenreListComponent: React.FC = () => {
    const genres = useAppSelector(state => state.genres.genres);
    const movies = useAppSelector(state => state.movies.movies);
    const { theme } = useTheme();



    return (
        <Box sx={{ bgcolor: theme === 'light' ? 'white' : 'black', color: theme === 'light' ? 'black' : 'white' }}>
            <Grid container spacing={2}>
                {movies.map(movie => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={movie.id}>
                        <MoviesListCard movie={movie} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};