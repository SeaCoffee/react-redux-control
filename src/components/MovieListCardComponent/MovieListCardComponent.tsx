import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import {PosterPreview} from "../PosterPreview/PosterPreview";
import {StarsRating} from "../StarsRatingComponent/StarsRatingComponent";
import {GenreBadge} from "../GenreBeigeComponent/GenreBeigeComponent";
import {Movie} from "../../interfaces/responseInterfaces";



interface MoviesListCardProps {
    movie: Movie;
    movieClick?: (movieId: number) => void;
}

export const MoviesListCard: React.FC<MoviesListCardProps> = ({ movie }) => {
    const navigate = useNavigate();
    const location = useLocation();


    const handleClick = () => {
        console.log(`Navigating to movie: ${movie.id}`);
        navigate(`/movie-details/${movie.id}?from=${location.pathname}`, { replace: true });
    };


    return (

        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            margin: '0.5%',
            cursor: 'pointer',
            boxSizing: 'border-box'
        }} onClick={handleClick}>


            <CardActionArea>
                <PosterPreview imageUrl={movie.poster_path} title={movie.title} />
                <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '180px',
                }}>
                    <Typography gutterBottom variant="h5" component="h3">
                        {movie.title}
                    </Typography>
                    <StarsRating rating={movie.vote_average} />
                    <GenreBadge genreIds={movie.genre_ids} />
                    <Typography variant="body2" color="text.secondary">
                        {movie.overview}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
