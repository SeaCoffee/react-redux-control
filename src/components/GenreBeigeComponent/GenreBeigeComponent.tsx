import React from 'react';
import { Badge } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import {useAppSelector} from "../../hooks/appDispatchHook";
import {RootState} from "../../store/store";



interface GenreBadgeProps {
    genreIds?: number[];
    genres?: string[];
}

export const GenreBadge: React.FC<GenreBadgeProps> = ({ genreIds, genres }) => {
    const allGenres = useAppSelector((state: RootState) => state.genres.genres);

    const genreNames = genres || (genreIds && genreIds.map(genreId => {
        const genre = allGenres.find(genre => genre.id === genreId);
        return genre?.name || 'Unknown';
    })) || [];

    return (
        <div style={{ margin: '0.5rem' }}>
            {genreNames.map((genreName, index) => (
                <Badge key={index} color="secondary" style={{ marginRight: '0.5rem' }}>
                    {genreName}
                </Badge>
            ))}
        </div>
    );
};

