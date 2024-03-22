import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";

import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material';

import {RootState} from "../../store/store";



interface GenreSelectorProps {
    onClose?: () => void;
}

export const GenreSelector: React.FC<GenreSelectorProps> = ({ onClose }) => {
    const genres = useSelector((state: RootState) => state.genres.genres);
    const navigate = useNavigate();

    const handleGenreClick = (genreId: number) => {
        console.log(`Navigating to genre: ${genreId}`);
        navigate(`/genres/${genreId}`);
        if (onClose) onClose();
    };

    if (!genres.length) {
        return <div>Loading...</div>;
    }

    return (
        <List>
            <Typography variant="h6" sx={{ padding: '16px' }}>Genres</Typography>
            <Divider />
            {genres.map(genre => (
                <ListItem
                    key={genre.id}
                    onClick={() => handleGenreClick(genre.id)}
                    sx={{ padding: '10px 16px' }}
                >
                    <ListItemText primary={genre.name} />
                </ListItem>
            ))}
        </List>
    );
};

