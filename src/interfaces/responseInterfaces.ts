export interface MovieApiResponse {
    page: number;
    results: Movie[];
    total_results: number;
    total_pages: number;
}

export interface GenreApiResponse {
    genres: Genre[];
}

export interface Genre {
    id: number;
    name: string;
}

export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    genre_ids: number[];
    overview: string;
    release_date: string;
    runtime?: number;
    budget?: number;
    revenue?: number;
    genres?: Genre[];
    production_countries?: { iso_3166_1: string; name: string }[];
}

export interface UserApiResponse {
    id: number;
    name: string;
    username: string;
}
