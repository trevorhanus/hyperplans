import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import Route from 'route-parser';

export interface NextApiResponseWithLocals extends NextApiResponse {
    locals: {
        req: NextApiRequest;
        // user?: User;
        // userId?: string;
    };
}

export class ApiError extends Error {
    status: number;

    constructor(message: string, status?: number) {
        super(message);
        Object.setPrototypeOf(this, ApiError.prototype);
        this.status = status || 500;
    }
}

export function sendResponse(res: NextApiResponseWithLocals, status: number, body?: any) {
    res.status(status);

    logRequest(res, body);
    
    if (body) {
        res.json(body);
    } else {
        res.end();
    }
}

export function sendError(res: NextApiResponseWithLocals, error: ApiError) {
    const status = error.status || 500;

    const body = {
        error: true,
        status: status,
        errorMessage: error.message,
    };

    sendResponse(res, status, body);
}

export type Handler = (req: NextApiRequest, res: NextApiResponseWithLocals) => Promise<void>;
export type ProtectedHandler = (userId: string, req: NextApiRequest, res: NextApiResponseWithLocals) => Promise<void>;

const composeHandler = (existingHandler: Handler, handlerOrRoute: string | Handler, handler?: Handler): Handler => {
    return async (req: NextApiRequest, res: NextApiResponseWithLocals) => {
        if (typeof handlerOrRoute === 'string') {
            const route = new Route(handlerOrRoute);
            const path = (req.query.path || []) as string[];
            const match = route.match(`/` + path.join('/'));

            if (match) {
                req.query = {
                    ...req.query,
                    ...match,
                };
                return handler(req, res);
            }
        }

        if (typeof handlerOrRoute === 'function') {
            return handlerOrRoute(req, res);
        }

        if (existingHandler) {
            return existingHandler(req, res);
        }

        throw new ApiError(`Route not found`, 405);
    }
}

export class ApiRouter {
    private _getHandler: Handler;
    private _patchHandler: Handler;
    private _postHandler: Handler;
    private _putHandler: Handler;
    private _deleteHandler: Handler;

    get = (handlerOrRoute: string | Handler, handler?: Handler) => {
        this._getHandler = composeHandler(this._getHandler, handlerOrRoute, handler);
    }

    patch = (handlerOrRoute: string | Handler, handler?: Handler) => {
        this._patchHandler = composeHandler(this._patchHandler, handlerOrRoute, handler)
    }

    post = (handlerOrRoute: string | Handler, handler?: Handler) => {
        this._postHandler = composeHandler(this._postHandler, handlerOrRoute, handler);
    }

    put = (handlerOrRoute: string | Handler, handler?: Handler) => {
        this._putHandler = composeHandler(this._putHandler, handlerOrRoute, handler);
    }

    delete = (handlerOrRoute: string | Handler, handler?: Handler) => {
        this._deleteHandler = composeHandler(this._deleteHandler, handlerOrRoute, handler);
    }

    async handle(req: NextApiRequest, res: NextApiResponse) {
        const resWithLocals = res as NextApiResponseWithLocals;

        resWithLocals.locals = {
            req,
            // userId: null,
            // user: null,
        };

        try {
            switch (req.method.toUpperCase()) {
    
                case this._getHandler && 'GET':
                    return await this._getHandler(req, resWithLocals);
    
                case this._patchHandler && 'PATCH':
                    return await this._patchHandler(req, resWithLocals);

                case this._postHandler && 'POST':
                    return await this._postHandler(req, resWithLocals);

                case this._putHandler && 'PUT':
                    return await this._putHandler(req, resWithLocals);
    
                case this._deleteHandler && 'DELETE':
                    return await this._deleteHandler(req, resWithLocals);
    
                default:
                    sendResponse(resWithLocals, 405, { message: `Method ${req.method} not allowed.`});
    
            }
        } catch (e) {
            if (!e.status || e.status >= 500) {
                // log any 500 errors or errors that were
                // not thrown by our code
                console.log(e);
            }

            sendError(resWithLocals, e);
        }
    }
}

export const apiRoute = (setup: (router: ApiRouter) => void): Handler => {
    const router = new ApiRouter();

    setup(router);

    return async (req: NextApiRequest, res: NextApiResponse) => {
        await router.handle(req, res);
    }
}

// export const withAuth = (handler: ProtectedHandler): Handler => {
//     return async (req: NextApiRequest, res: NextApiResponseWithLocals) => {
//         const auth0 = await getAuth0();
//         const session = await auth0.getSession(req);
//         const userId = session?.user?.id;
    
//         if (!userId) {
//             throw new ApiError('Unauthorized', 401);
//         }

//         res.locals.userId = userId;

//         await handler(userId, req, res);
//     }
// }

export interface NextApiRequestWithDb extends NextApiRequest {
    prisma: PrismaClient;
}

export function withDb(handler: Handler): Handler {
    return async (req: NextApiRequestWithDb, res: NextApiResponseWithLocals) => {
        req.prisma = new PrismaClient();
        await handler(req, res);
    }
}

function logRequest(res: NextApiResponseWithLocals, body?: any) {
    const { req } = res.locals;

    const data = {
        request: {
            method: req.method,
            url: req.url,
            json: req.body,
        },
        response: {
            status: res.statusCode,
            json: body,
        },
        user: {
            // ...user,
            // id: userId,
            id: null
        }
    };

    console.log(`[${data.request.method}] ${data.response.status} ${data.user?.id || '-'} ${data.request.url}`);
}
