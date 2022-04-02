import { FloorPlanOptions, generateFloorPlan, getFloorPlan, getFloorPlans } from 'controllers/FloorPlan';
import { apiRoute, NextApiRequestWithDb, NextApiResponseWithLocals, sendResponse, withDb } from 'utils/api';

const floorPlans = apiRoute(router => {

    router.get('/', async (req: NextApiRequestWithDb, res: NextApiResponseWithLocals) => {
        const floorPlans = await getFloorPlans('cl1hzrilp0011928waqrhn8wb');
        sendResponse(res, 200, { floorPlans });
    });

    router.get('/:floorPlanId', async (req: NextApiRequestWithDb, res: NextApiResponseWithLocals) => {
        const floorPlan = await getFloorPlan('cl1hzrilp0011928waqrhn8wb', req.query.floorPlanId as string);
        sendResponse(res, 200, floorPlan);
    });

    router.post('/', async (req: NextApiRequestWithDb, res: NextApiResponseWithLocals) => {
        const params: FloorPlanOptions = {
            title: req.body.title,
            width: parseFloat(req.body.width),
            height: parseFloat(req.body.height),
            minRoomLength: parseFloat(req.body.minRoomLength),
            maxRoomLength: parseFloat(req.body.maxRoomLength),
            maxDoors: parseInt(req.body.maxDoors),
            userId: 'cl1hzrilp0011928waqrhn8wb',
        };

        const floorPlan = await generateFloorPlan(params);
        sendResponse(res, 201, floorPlan);
    });

});

const floorPlansWithDb = withDb(floorPlans);
export default floorPlansWithDb;
