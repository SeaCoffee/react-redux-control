import React from 'react';
import { useParams } from 'react-router-dom';

import {MovieInfo} from "../components/MovieInfoComponent/MovieInfoComponent";


export const MovieInfoPage: React.FC = () => {
    const { movieId } = useParams<{ movieId?: string }>();


    if (!movieId) {
        return <div>Movie id is not found</div>;
    }

    return <MovieInfo />;
};