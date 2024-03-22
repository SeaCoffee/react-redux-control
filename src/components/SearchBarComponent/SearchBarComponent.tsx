import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector} from "react-redux";
import {useState} from "react";

import {RootState} from "../../store/store";
import {setQuery} from "../../store/slices/searchSlice";
import {useAppDispatch} from "../../hooks/appDispatchHook";

import './SearchBar.css'

export interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}


export const SearchBar: React.FC = () => {
    const query = useSelector((state: RootState) => state.search.query);
    const [inputValue, setInputValue] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setQuery(inputValue));
        navigate(`/search?query=${inputValue}`);
        setInputValue('');
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                className="search-input"
                type="text"
                placeholder="Search for movies..."
                value={inputValue}
                onChange={handleChange}
            />
            <button className="search-button" type="submit">Search</button>
        </form>
    );
};

