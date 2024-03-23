import {useEffect} from "react";
import { useSelector} from 'react-redux';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import {MoviesListCard} from "../MovieListCardComponent/MovieListCardComponent";
import {usePageQuery} from "../../servises/pagination";
import {useTheme} from "../../contexts/ThemeContext";
import {fetchMovies} from "../../store/slices/moviesListSlice";
import {fetchGenres} from "../../store/slices/genreSlice";
import { RootState} from "../../store/store";
import {useAppDispatch} from "../../hooks/appDispatchHook";




export const MoviesListComponent: React.FC = () => {
    const { page: queryPage, prevPage, nextPage } = usePageQuery();
    const page = queryPage ? parseInt(queryPage, 10) : 1;
    const dispatch = useAppDispatch();
    const movies = useSelector((state: RootState) => state.movies.movies);
    const genresStatus = useSelector((state: RootState) => state.genres.status);
    const { theme } = useTheme();


    useEffect(() => {
        dispatch(fetchMovies({ page }));
        if (genresStatus === 'idle') {
            dispatch(fetchGenres());
        }
    }, [dispatch, page, genresStatus]);

    return (
        <Box sx={{ bgcolor: theme === 'light' ? 'white' : 'black', color: theme === 'light' ? 'black' : 'white' }}>
            <Grid container spacing={2}>
                {movies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={movie.id}>
                        <MoviesListCard movie={movie} />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button onClick={prevPage}>Previous page</Button>
                <Typography>Current page {page}</Typography>
                <Button onClick={nextPage}>Next page</Button>
            </Box>
        </Box>
    );
};
