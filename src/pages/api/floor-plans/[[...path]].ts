import { FloorPlanOptions, generateFloorPlan, getFloorPlan, getFloorPlans } from 'controllers/FloorPlan';
import { getSession } from 'next-auth/react';
import { ApiError, apiRoute, NextApiRequestWithDb, NextApiResponseWithLocals, sendResponse, withDb } from 'utils/api';

const floorPlans = apiRoute(router => {

    router.get('/', async (req: NextApiRequestWithDb, res: NextApiResponseWithLocals) => {
        const session = await getSession({ req });

        if (!session.user) {
            throw new ApiError('not authorized', 401);
        }

        const floorPlans = await getFloorPlans(session.user.id);
        sendResponse(res, 200, { floorPlans });
    });

    router.get('/:floorPlanId', async (req: NextApiRequestWithDb, res: NextApiResponseWithLocals) => {
        const session = await getSession({ req });

        if (!session.user) {
            throw new ApiError('not authorized', 401);
        }

        const floorPlan = await getFloorPlan(session.user.id, req.query.floorPlanId as string);
        sendResponse(res, 200, floorPlan);
    });

    router.post('/', async (req: NextApiRequestWithDb, res: NextApiResponseWithLocals) => {
        const session = await getSession({ req });

        if (!session.user) {
            throw new ApiError('not authorized', 401);
        }

        const params: FloorPlanOptions = {
            title: req.body.title,
            width: parseFloat(req.body.width),
            height: parseFloat(req.body.height),
            minRoomLength: parseFloat(req.body.minRoomLength),
            maxRoomLength: parseFloat(req.body.maxRoomLength),
            maxDoors: parseInt(req.body.maxDoors),
            userId: session.user.id,
        };

        const floorPlan = await generateFloorPlan(params);
        sendResponse(res, 201, floorPlan);
    });

});

const floorPlansWithDb = withDb(floorPlans);
export default floorPlansWithDb;
