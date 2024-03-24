import { createBrowserRouter } from 'react-router-dom';

import {MainLayout} from "./components/layouts/MainLayout";
import MoviesListPage from "./pages/MoviesListPage";
import {MovieInfoPage} from "./pages/MovieInfoPage";
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
            { path: 'movie-details/:movieId', element: <MovieInfoPage /> },
            { path: 'genres', element: <MoviesListPage /> },
            { path: 'genres/:genreId', element: <MoviesListGenrePage /> },
        ],
    },
]);

export default router;
