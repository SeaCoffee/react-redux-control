import React, { useEffect } from 'react';

import { Box, Button, Typography } from '@mui/material';

import {fetchMovies} from "../../store/slices/moviesListSlice";
import {GenreListComponent} from "../GenreListComponent/GenreListComponent";
import {usePageQuery} from "../../hooks/pagination";
import {useAppDispatch} from "../../hooks/appDispatchHook";


interface MovieGenreProps {
    genreId: number;
}

export const MovieGenre: React.FC<MovieGenreProps> = ({ genreId }) => {
    const dispatch = useAppDispatch();
    const {
        currentPage,
        prevPage,
        nextPage,
        totalPages
    } = usePageQuery();

    useEffect(() => {
        if (genreId) {
            dispatch(fetchMovies({ genreId, page: currentPage }));
        }
    }, [dispatch, genreId, currentPage]);

    return (
        <div>
            <GenreListComponent />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button onClick={prevPage} disabled={currentPage <= 1}>Previous page</Button>
                <Typography>Page {currentPage} of {totalPages}</Typography>
                <Button onClick={nextPage} disabled={currentPage >= totalPages}>Next Page</Button>
            </Box>
        </div>
    );
};




