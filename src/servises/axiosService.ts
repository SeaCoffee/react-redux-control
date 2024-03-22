import axios, { AxiosResponse, AxiosInstance } from 'axios';

import {baseURL} from "../urls/urls";
import {MovieApiResponse, GenreApiResponse, UserApiResponse, Movie, Genre} from "../interfaces/responseInterfaces";


export const apiRequest: AxiosInstance = axios.create({baseURL})


const apiService = axios.create({
    baseURL: 'https://api.themoviedb.org'
});

const userApiService = axios.create({
    baseURL: 'https://api.themoviedb.org'
});

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGI1MGU4NDEwNDBkNDRmNTM4M2FhYmQ1NjM3NWFlMyIsInN1YiI6IjY1ZGIwYjQ3NGMxZDlhMDE0OTZlZTRhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ilvqz3h97l6BS5an2BS-sxDk7VDTu13Qcv1fFHAWHfA';

apiService.interceptors.request.use(request => {
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

userApiService.interceptors.request.use(request => {
    request.headers.Authorization = `Bearer ${token}`;
    return request;
});

export const moviesService = {
    getAll: (page = 1): Promise<AxiosResponse<MovieApiResponse>> =>
        apiService.get(`/3/movie/popular?page=${page}`)
            .then(response => response)
            .catch(error => { console.error(error); throw error; }),

    byId: (movie_id: number): Promise<AxiosResponse<Movie>> =>
        apiService.get(`/3/movie/${movie_id}`)
            .then(response => response)
            .catch(error => { console.error(error); throw error; }),
};


export const genresService = {
    getAll: (): Promise<AxiosResponse<GenreApiResponse>> =>
        apiService.get('/3/genre/movie/list')
            .then(response => response)
            .catch(error => { console.error(error); throw error; }),

    getMoviesByGenre: (genreId: number, page = 1): Promise<AxiosResponse<MovieApiResponse>> =>
        apiService.get(`/3/discover/movie?with_genres=${genreId}&page=${page}`)
            .then(response => response)
            .catch(error => { console.error(error); throw error; }),
};

export const searchService = {
    getAll: (query: string, page: number = 1): Promise<AxiosResponse<MovieApiResponse>> => {
        console.log(`Sending request to API: query = ${query}, page = ${page}`);
        return apiService.get(`/3/search/movie?query=${encodeURIComponent(query)}&page=${page}`)
            .then(response => {
                console.log("Response from API:", response);
                return response;
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                throw error;
            });
    },
};


export const userService = {
    getUserInfo: (): Promise<AxiosResponse<UserApiResponse>> =>
        userApiService.get('/3/account')
            .then(response => response)
            .catch(error => { console.error(error); throw error; }),
};

export const posterService = {
    getPosterUrl: (imageUrl: string): string => {
        return `https://image.tmdb.org/t/p/w500${imageUrl}`;
    }
};

export default apiService;