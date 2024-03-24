import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { setQuery } from "../../store/slices/searchSlice";
import { useAppDispatch } from "../../hooks/appDispatchHook";

import './SearchBar.css';

type FormData = {
    search: string;
};

export const SearchBar: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = (data: FormData) => {
        dispatch(setQuery(data.search));
        navigate(`/search?query=${data.search}&from=${location.pathname}`);
        reset();
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="search-form">
            <input
                {...register('search', { required: true, minLength: 3 })}
                className="search-input"
                type="text"
                placeholder="Search for movies..."
            />
            {errors.search && <p className="error-message">Required field</p>}
            <button className="search-button" type="submit">Search</button>
        </form>
    );
};


