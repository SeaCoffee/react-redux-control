import React from 'react';
import {useContext} from "react";

import {ThemeContext} from "../../contexts/ThemeContext";


export const ThemeSwitcher: React.FC = () => {
    console.log('Rendering theme switcher');

    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
    </button>
);
};

