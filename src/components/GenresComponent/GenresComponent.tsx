import React, { useEffect } from 'react';

import { Box, Button, Typography } from '@mui/material';

import {fetchMovies} from "../../store/slices/moviesListSlice";
import {GenreListComponent} from "../GenreListComponent/GenreListComponent";
import {usePageQuery} from "../../servises/pagination";
import {useAppDispatch} from "../../hooks/appDispatchHook";




interface MovieGenreProps {
    genreId: number;
}

export const MovieGenre: React.FC<MovieGenreProps> = ({ genreId }) => {
    const { page, prevPage, nextPage } = usePageQuery();
    const dispatch = useAppDispatch();


    useEffect(() => {
        const pageNumber = page ? parseInt(page, 10) : 1;
        if (genreId) {
            dispatch(fetchMovies({ genreId, page: pageNumber }));
        }
    }, [dispatch, genreId, page]);

    const paginationControls = (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={prevPage}>Previous page</Button>
            <Typography>Current page {page}</Typography>
            <Button onClick={nextPage}>Next page</Button>
        </Box>
    );

    return (
        <div>
            <GenreListComponent />
            {paginationControls}
        </div>
    );
};



