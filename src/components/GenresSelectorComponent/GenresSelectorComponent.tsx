import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { List, ListItem, ListItemText, Divider } from '@mui/material';

import {useAppSelector} from "../../hooks/appDispatchHook";



interface GenreSelectorProps {
    onClose?: () => void;
}

export const GenreSelector: React.FC<GenreSelectorProps> = ({ onClose }) => {
    const genres = useAppSelector((state) => state.genres.genres);
    const navigate = useNavigate();
    const location = useLocation();

    const handleGenreClick = (genreId?: number) => {
        const path = genreId ? `/genres/${genreId}` : '/';
        console.log(`Navigating to: ${path}`);
        navigate(path);
        if (onClose) onClose();
    };

    if (!genres.length) {
        return <div>Loading...</div>;
    }


    return (
        <List>
            <ListItem
                onClick={() => handleGenreClick()}
                sx={{
                    padding: '10px 16px',
                    backgroundColor: location.pathname === '/' ? 'lightblue' : 'inherit',
                    fontWeight: 'bold',
                    borderTop: '1px solid #ddd',
                    borderBottom: '1px solid #ddd',
                    mb: 1,
                }}
            >
                <ListItemText primary="Home" />
            </ListItem>
            <Divider />
            {genres.map(genre => (
                <ListItem
                    key={genre.id}
                    onClick={() => handleGenreClick(genre.id)}
                    sx={{ padding: '10px 16px', backgroundColor: location.pathname === `/genres/${genre.id}` ? 'lightblue' : 'inherit' }}
                >
                    <ListItemText primary={genre.name} />
                </ListItem>
            ))}
        </List>
    );
};

