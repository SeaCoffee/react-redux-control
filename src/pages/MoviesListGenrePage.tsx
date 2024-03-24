import React from 'react';
import { useParams } from 'react-router-dom';

import {MovieGenre} from "../components/GenresComponent/GenresComponent";



const MoviesListGenrePage: React.FC = () => {
    const { genreId } = useParams<{ genreId: string }>();

    if (!genreId) {
        return <div>Genre not found</div>;
    }

    const genreIdNumber = parseInt(genreId, 10);
    if (isNaN(genreIdNumber)) {
        return <div>Invalid genre ID</div>;
    }

    return (
        <div>
            <MovieGenre genreId={genreIdNumber} />
        </div>
    );
};

export default MoviesListGenrePage;
