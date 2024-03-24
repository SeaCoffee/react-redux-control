import {useAppSelector, useAppDispatch} from "./appDispatchHook";
import {fetchMovies} from "../store/slices/moviesListSlice";



export const usePageQuery = () => {
    const dispatch = useAppDispatch();
    const currentPage = useAppSelector((state) => state.movies.currentPage);
    const totalPages = useAppSelector((state) => state.movies.totalPages);
    const movies = useAppSelector((state) => state.movies.movies);
    const genres = useAppSelector((state) => state.genres.genres);
    const searchQuery = useAppSelector((state) => state.search.query);
    const searchPage = useAppSelector((state) => state.search.page);
    const searchTotalPages = useAppSelector((state) => state.search.totalPages);
    const searchMovies = useAppSelector((state) => state.search.movies?.results || []);

    const prevPage = () => {
        if (currentPage > 1) {
            dispatch(fetchMovies({ page: currentPage - 1 }));
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            dispatch(fetchMovies({ page: currentPage + 1 }));
        }
    };

    const prevSearchPage = () => {
        if (searchPage > 1) {
            dispatch(fetchMovies({ searchTerm: searchQuery, page: searchPage - 1 }));
        }
    };

    const nextSearchPage = () => {
        if (searchPage < searchTotalPages) {
            dispatch(fetchMovies({ searchTerm: searchQuery, page: searchPage + 1 }));
        }
    };

    return {
        currentPage,
        totalPages,
        prevPage,
        nextPage,
        movies,
        genres,
        searchQuery,
        searchPage,
        searchTotalPages,
        prevSearchPage,
        nextSearchPage,
        searchMovies,
    };
};


