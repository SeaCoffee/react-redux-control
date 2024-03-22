import React from 'react';
import { useParams } from 'react-router-dom';

import {MovieDetails} from "../components/MovieDetailsComponent/MovieDetailsComponent";


export const MovieDetailsPage: React.FC = () => {
    const { movieId } = useParams<{ movieId?: string }>();
    const genreDictionary: Record<string, string> = {};

    if (!movieId) {
        return <div>Movie id is not found</div>;
    }

    return <MovieDetails />;
};