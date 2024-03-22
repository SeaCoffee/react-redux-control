import { createBrowserRouter } from 'react-router-dom';

import {MainLayout} from "./components/layouts/MainLayout";
import MoviesListPage from "./pages/MoviesListPage";
import {MovieDetailsPage} from "./pages/MovieDetailsPage";
import MoviesListGenrePage from "./pages/MoviesListGenrePage";
import {SearchPage} from "./pages/SearchResultPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <MoviesListPage /> },
            { path: 'search', element: <SearchPage /> },
            { path: 'movies', element: <MoviesListPage /> },
            { path: 'movie-details/:movieId', element: <MovieDetailsPage /> },
            { path: 'genres', element: <MoviesListPage /> },
            { path: 'genres/:genreId', element: <MoviesListGenrePage /> },
        ],
    },
]);

export default router;
