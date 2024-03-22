import React, { createContext, useState, useContext, ReactNode } from 'react';



type ThemeContextType = {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => {},
});

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {

    const [theme, setTheme] = useState<'light' | 'dark'>(
        localStorage.getItem('theme') as 'light' | 'dark' || 'light'
    );

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            // Сохраняем новую тему в localStorage
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };


    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
export const useTheme = () => useContext(ThemeContext);
