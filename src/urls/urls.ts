
export const baseURL = 'https://api.themoviedb.org';

const movieList = '/3/discover/movie';
const movieGenreList = '/3/genre/movie/list';
const oneMovie = '/3/movie';
const searchMovie = '/3/search/movie';


interface Endpoints {
    list: {
        base: string;
        byId: (movie_id: number) => string;
    };
    genres: {
        base: string;
        moviesByGenre: (genreId: number) => string;
    };
    search: {
        base: string;
    };
}

export const endpoints: Endpoints = {
    list: {
        base: movieList,
        byId: (movie_id) => `${oneMovie}/${movie_id}`
    },
    genres: {
        base: movieGenreList,
        moviesByGenre: (genreId) => `${movieList}?with_genres=${genreId}`
    },
    search: {
        base: searchMovie
    }
};


export default {
    baseURL, endpoints
}