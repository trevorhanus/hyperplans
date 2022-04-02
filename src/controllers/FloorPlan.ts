import { PrismaClient, FloorPlan } from '@prisma/client';

export async function getFloorPlan(userId: string, floorPlanId: string): Promise<FloorPlan> {
    const prisma = new PrismaClient();

    const plan = await prisma.floorPlan.findFirst({
        where: {
            userId,
            id: floorPlanId,
        }
    });

    if (!plan) {
        throw new Error('Floor plan not found');
    }

    return plan;
}

export async function getFloorPlans(userId: string): Promise<FloorPlan[]> {
    const prisma = new PrismaClient();

    return prisma.floorPlan.findMany({
        where: {
            userId,
        }
    });
}

export interface FloorPlanOptions {
    title: string;
    width: number; // x
    height: number; // y
    minRoomLength: number;
    maxRoomLength: number;
    maxDoors: number;
    userId: string;
}

/**
 * All lengths must be greater than 4 ft
 * 
 */

export async function generateFloorPlan(opts: FloorPlanOptions): Promise<FloorPlan> {
    const prisma = new PrismaClient();

    const {
        title,
        width,
        height,
        minRoomLength,
        maxRoomLength,
        maxDoors,
        userId,
    } = opts;

    if (!title) {
        throw new Error('Title is required');
    }

    if (width < 4) {
        throw new Error('Width must be greater than 4 ft.');
    }

    if (height < 4) {
        throw new Error('Length must be greater than 4 ft.');
    }

    if (minRoomLength < 3) {
        throw new Error('Minimum room length must be greater than 3 ft.');
    }

    const planX = width;
    const planY = height;

    // Determine # of rooms in x direction
    let numRoomsX = Math.ceil(planX / maxRoomLength);
    let roomX = planX / numRoomsX;

    if (roomX < minRoomLength) {
        throw new Error('Floor plan is not possible.');
    }

    // Determine # of rooms in y direction
    let numRoomsY = Math.ceil(planY / maxRoomLength);
    let roomY = planY / numRoomsY;

    if (roomY < minRoomLength) {
        throw new Error('Floor plan is not possible.');
    }

    return prisma.floorPlan.create({
        data: {
            title,
            planX,
            planY,
            numRoomsX,
            numRoomsY,
            userId,
        }
    });
}
