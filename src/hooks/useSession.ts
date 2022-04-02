import useSWR from 'swr';
import { FetchError, swrFetcher } from 'utils/fetcher';

export interface UseSessionHook {
    isLoading: boolean;
    error?: FetchError;
    user?: any;
}

export interface Session {
    email: string;
}

export const useSession = (): UseSessionHook => {
    const { data, error } = useSWR<Session>(
        '/api/auth/session',
        swrFetcher
    );

    console.log(error);
    console.log(data);

    return {
        isLoading: !data && !error,
        error,
        user: data?.email ? data : null,
    };
}
