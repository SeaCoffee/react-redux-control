import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {MoviesListCard} from "../MovieListCardComponent/MovieListCardComponent";
import {GenreSelector} from "../GenresSelectorComponent/GenresSelectorComponent";
import {usePageQuery} from "../../servises/pagination";
import {fetchMovies} from "../../store/slices/moviesListSlice";
import {fetchGenres} from "../../store/slices/genreSlice";
import {RootState} from "../../store/store";
import {useAppDispatch} from "../../hooks/appDispatchHook";


export const MovieGenreList: React.FC = () => {
    const dispatch = useAppDispatch();
    const genres = useSelector((state: RootState) => state.genres.genres);
    const movies = useSelector((state: RootState) => state.movies.movies);
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const { page, prevPage, nextPage } = usePageQuery();

    useEffect(() => {
        dispatch(fetchGenres());
    }, [dispatch]);

    useEffect(() => {
        const pageNumber = page ? parseInt(page, 10) : 1;
        if (selectedGenre) {
            dispatch(fetchMovies({ genreId: parseInt(selectedGenre, 10), page: pageNumber }));
        } else {
            dispatch(fetchMovies({ page: pageNumber }));
        }
    }, [dispatch, selectedGenre, page]);

    return (
        <div>
            <GenreSelector />
            <div className="movies-container">
                {movies.map((movie) => (
                    <MoviesListCard key={movie.id} movie={movie} />
                ))}
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button onClick={prevPage}>Previous page</Button>
                <Typography>Current page {page}</Typography>
                <Button onClick={nextPage}>Next page</Button>
            </Box>
        </div>
    );
};
