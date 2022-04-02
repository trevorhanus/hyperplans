export class FetchError extends Error {
    status: number;

    constructor(message: string, status?: number) {
        super(message);
        Object.setPrototypeOf(this, FetchError.prototype);
        this.status = status || 500;
    }
}

export interface FetchResult<Data = any> {
    data?: Data;
    error?: FetchError;
}

export async function fetcher<Data>(input: RequestInfo, init?: RequestInit): Promise<FetchResult<Data>> {
    try {
        init = {
            ...init,
            headers: {
                'Content-Type': 'application/json',
                ...(init?.headers || {}),
            }
        };
        const res = await fetch(input, init);
        const json = await getJson(res);
        if (res.ok) {
            return { data: json };
        } else {
            throw new FetchError(json.errorMessage || json.message, res.status);
        }
    } catch (e) {
        console.log(e);
        if (!(e instanceof FetchError)) {
            e = new FetchError(e.message, 500);
        }
        return { error: e };
    }
}

export async function swrFetcher<Data>(input: RequestInfo, init?: RequestInit): Promise<Data> {
    const { data, error } = await fetcher<Data>(input, init);

    if (error) {
        throw error;
    }

    return data;
}

export async function getJson(res: Response): Promise<any> {
    try {
        return await res.json();
    } catch (e) {
        // invariant: this should never happen?
        // means there is a bug with our api
        return {};
    }
}
