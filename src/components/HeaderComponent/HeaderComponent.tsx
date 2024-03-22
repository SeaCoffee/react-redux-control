import React from 'react';
import {useEffect, useState} from "react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Switch from '@mui/material/Switch';

import {UserInfo} from "../UserInfoComponent/UserInfoComponent";
import {GenreSelector} from "../GenresSelectorComponent/GenresSelectorComponent";
import {SearchBar} from "../SearchBarComponent/SearchBarComponent";
import {useTheme} from "../../contexts/ThemeContext";
import {fetchGenres} from "../../store/slices/genreSlice";
import {useAppDispatch} from "../../hooks/appDispatchHook";

import './Header.css'


export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
    const dispatch = useAppDispatch();
    const { theme, toggleTheme } = useTheme();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const appBarClass = theme === 'light' ? 'app-bar-light' : 'app-bar-dark';


    const handleThemeChange = () => {
        toggleTheme();
    };

    useEffect(() => {
        dispatch(fetchGenres());
    }, [dispatch]);

    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setIsDrawerOpen(open);
    };




    return (
        <>
            <Box sx={{ flexGrow: 1 }} className={appBarClass}>
                <AppBar position="static" sx={{ backgroundColor: theme === 'light' ? '#fff' : 'black', color: theme === 'light' ? '#000' : '#fff' }} >
                <Toolbar className="toolbar">
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => setIsDrawerOpen(true)}
                            className="menu-icon"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h4" noWrap sx={{ flexGrow: 1 }} className="header-title">
                            MovieDB
                        </Typography>
                        <div className="search">
                            <SearchBar />
                        </div>
                        <UserInfo />
                        <Switch
                            checked={theme === 'dark'}
                            onChange={handleThemeChange}
                            className="theme-switch"
                        />
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                anchor='left'
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                className="genre-drawer"
            >
                <GenreSelector onClose={() => setIsDrawerOpen(false)} />
            </Drawer>

        </>
    );
};
export default Header;

