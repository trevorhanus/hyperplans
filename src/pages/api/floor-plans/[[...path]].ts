import { FloorPlanOptions, generateFloorPlan, getFloorPlan, getFloorPlans } from 'controllers/FloorPlan';
import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';
import { ApiError, apiRoute, NextApiResponseWithLocals, sendResponse } from 'utils/api';

const floorPlans = apiRoute(router => {

    router.get('/', async (req: NextApiRequest, res: NextApiResponseWithLocals) => {
        const session = await getSession({ req });

        if (!session.user) {
            throw new ApiError('not authorized', 401);
        }

        const floorPlans = await getFloorPlans(session.user.id);
        sendResponse(res, 200, { floorPlans });
    });

    router.get('/:floorPlanId', async (req: NextApiRequest, res: NextApiResponseWithLocals) => {
        const session = await getSession({ req });

        if (!session.user) {
            throw new ApiError('not authorized', 401);
        }

        const floorPlan = await getFloorPlan(session.user.id, req.query.floorPlanId as string);
        sendResponse(res, 200, floorPlan);
    });

    router.post('/', async (req: NextApiRequest, res: NextApiResponseWithLocals) => {
        const session = await getSession({ req });

        if (!session.user) {
            throw new ApiError('not authorized', 401);
        }

        const params: FloorPlanOptions = {
            title: req.body.title,
            width: parseFloat(req.body.width),
            length: parseFloat(req.body.length),
            minRoomLength: parseFloat(req.body.minRoomLength),
            maxRoomLength: parseFloat(req.body.maxRoomLength),
            maxDoors: parseInt(req.body.maxDoors),
            userId: session.user.id,
        };

        const floorPlan = await generateFloorPlan(params);
        sendResponse(res, 201, floorPlan);
    });

});

export default floorPlans;
