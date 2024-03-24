import React, { useEffect } from 'react';
import {useParams} from "react-router-dom";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


import {PosterPreview} from "../PosterPreview/PosterPreview";
import {StarsRating} from "../StarsRatingComponent/StarsRatingComponent";
import {useAppDispatch} from "../../hooks/appDispatchHook";
import {useAppSelector} from "../../hooks/appDispatchHook";
import {fetchMovie} from "../../store/slices/moviesListSlice";
import {BackButton} from "../BackButtonComponent/BackButtonComponent";
import {GenreBadge} from "../GenreBeigeComponent/GenreBeigeComponent";

import './MovieInfo.css'



export const MovieInfo: React.FC = () => {
    const {movieId} = useParams<{ movieId: string }>();
    const dispatch = useAppDispatch();
    const movie = useAppSelector((state) => state.movies.currentMovie);
    const status = useAppSelector((state) => state.movies.currentMovieStatus);


    useEffect(() => {
        dispatch(fetchMovie(Number(movieId)));
    }, [dispatch, movieId]);


    if (!movie || status === 'loading') {
        return <div>Loading...</div>;
    }


    return (
        <Card raised style={{backgroundColor: 'white', color: 'black'}}>
            <CardContent>
                <Grid container spacing={2}>
                    <BackButton/>
                    <Grid item xs={12} sm={4}>
                        <PosterPreview imageUrl={movie.poster_path} title={movie.title}/>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Typography variant="h5" component="h2" style={{marginBottom: '1rem'}}>
                            {movie.title}
                        </Typography>
                        <StarsRating rating={movie.vote_average}/>
                        {movie.genres ? (
                            <GenreBadge genres={movie.genres.map((genre) => genre.name)}/>
                        ) : null}
                        <Typography variant="body2" color="text.secondary" style={{marginTop: '1rem'}}>
                            {movie.overview}
                        </Typography>
                        <Typography variant="body2" style={{marginTop: '0.5rem'}}>
                            Year: {movie.release_date}
                        </Typography>
                        <Typography variant="body2" style={{marginTop: '0.5rem'}}>
                            Runtime: {movie.runtime} min
                        </Typography>
                        <Typography variant="body2" style={{marginTop: '0.5rem'}}>
                            Budget: ${movie.budget}
                        </Typography>
                        <Typography variant="body2" style={{marginTop: '0.5rem'}}>
                            Revenue: ${movie.revenue}
                        </Typography>
                        {movie.production_countries && (
                            <Typography variant="body2" style={{marginTop: '0.5rem'}}>
                                Production
                                Countries: {movie.production_countries.map((country) => country.name).join(', ')}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
