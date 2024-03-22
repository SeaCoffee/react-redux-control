import React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';


export interface StarsRatingProps {
    rating: number;
}


export const StarsRating: React.FC<StarsRatingProps> = ({ rating }) => {
    return (
        <Box>
            <Rating
                name="rating"
                value={rating / 2}
                precision={0.5}
                size="large"
            />
        </Box>
    );
};

