import React from 'react';
import { Outlet } from 'react-router-dom';


import {Header} from "../HeaderComponent/HeaderComponent";
import {useTheme} from "../../contexts/ThemeContext";
import {Genre, Movie} from "../../interfaces/responseInterfaces";

export interface MainLayoutProps {
    onSearch: (searchTerm: string) => void;
    movies?: Movie[];
    genres?: Genre[];
    children?: React.ReactNode;
}


export const MainLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const { theme } = useTheme();

    const layoutStyle = {
        backgroundColor: theme === 'light' ? 'white' : 'black',
        color: theme === 'light' ? 'black' : 'white',
    };

    return (
        <div style={layoutStyle}>
            <Header />
            <Outlet />
            {children}
        </div>
    );
};
