import useSWR from 'swr';
import { FetchError, swrFetcher } from 'utils/fetcher';

export interface UseSessionHook {
    isLoading: boolean;
    error?: FetchError;
    user?: User;
}

export interface User {
    email: string;
    name: string;
    image: string;
}

export interface Session {
    user?: User;
}

export const useSession = (): UseSessionHook => {
    const { data, error } = useSWR<Session>(
        '/api/auth/session',
        swrFetcher
    );

    return {
        isLoading: !data && !error,
        error,
        user: data?.user ? data.user : null,
    };
}
