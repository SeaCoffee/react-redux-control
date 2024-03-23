import React from 'react';
import { Outlet } from 'react-router-dom';

import {Header} from "../HeaderComponent/HeaderComponent";
import {useTheme} from "../../contexts/ThemeContext";



export const MainLayout: React.FC = () => {
    const { theme } = useTheme();

    const layoutStyle = {
        backgroundColor: theme === 'light' ? 'white' : 'black',
        color: theme === 'light' ? 'black' : 'white',
    };

    return (
        <div style={layoutStyle}>
            <Header />
            <Outlet />

        </div>
    );
};
