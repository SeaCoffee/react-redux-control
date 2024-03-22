import React from 'react';
import {posterService} from "../../servises/axiosService";

export interface PosterPreviewProps {
    imageUrl: string;
    title: string;
}

export const PosterPreview: React.FC<PosterPreviewProps> = ({ imageUrl, title }) => {
    const posterUrl = posterService.getPosterUrl(imageUrl);

    return (
        <img src={posterUrl} alt={title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
    );
};