import {useSearchParams} from "react-router-dom";

export interface IPagination<T> {
    total_items: number;
    total_pages: number;
    prev: string;
    next: string;
    items: T[]
}

export interface UsePageQueryReturn {
    page: string | null;
    prevPage: () => void;
    nextPage: () => void;
}


export const usePageQuery = (): UsePageQueryReturn => {
    const [query, setQuery] = useSearchParams({ page: '1' });

    const page = query.get('page');
    console.log('Current page', page);

    const prevPage = () => {
        const newQuery = new URLSearchParams(query);
        newQuery.set('page', Math.max(1, Number(newQuery.get('page')) - 1).toString());
        setQuery(newQuery);
        console.log('Previous:', newQuery.get('page'));
    };

    const nextPage = () => {
        const newQuery = new URLSearchParams(query);
        newQuery.set('page', (Number(newQuery.get('page')) + 1).toString());
        setQuery(newQuery);
        console.log('Next page', newQuery.get('page'));
    };

    return {
        page,
        prevPage,
        nextPage
    };
};