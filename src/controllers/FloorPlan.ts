import { FloorPlan, Prisma } from '@prisma/client';
import prisma from 'conn/prisma';

export async function getFloorPlan(userId: string, floorPlanId: string): Promise<FloorPlan> {
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
    return prisma.floorPlan.findMany({
        where: {
            userId,
        }
    });
}

export interface FloorPlanOptions {
    title: string;
    width: number; // x
    length: number; // y
    minRoomLength: number;
    maxRoomLength: number;
    maxDoors: number;
    userId: string;
}

export interface Room extends Prisma.JsonObject {
    name: string;
    x: number;
    y: number;
    width: number;
    length: number;
    numDoors: number;
}

export interface Door extends Prisma.JsonObject {
    cx: number;
    cy: number;
    orientation: 'vertical' | 'horizontal';
}

export async function generateFloorPlan(opts: FloorPlanOptions): Promise<FloorPlan> {
    const {
        title,
        width,
        length,
        minRoomLength,
        maxRoomLength,
        maxDoors,
        userId,
    } = opts;

    if (!title) {
        throw new Error('Title is required.');
    }

    if (width < 4) {
        throw new Error('Width must be at least 4 ft.');
    }

    if (length < 4) {
        throw new Error('Length must be at least 4 ft.');
    }

    if (minRoomLength < 4) {
        throw new Error('Minimum room length must be at least 4 ft.');
    }

    const planX = width;
    const planY = length;

    // Determine # of rooms in x direction
    let numRoomsX = Math.ceil(planX / maxRoomLength);
    let roomX = planX / numRoomsX;

    if (roomX < minRoomLength) {
        throw new Error('Minimum room length constraint violated. Try reducing.');
    }

    // Determine # of rooms in y direction
    let numRoomsY = Math.ceil(planY / maxRoomLength);
    let roomY = planY / numRoomsY;

    if (roomY < minRoomLength) {
        throw new Error('Minimum room length constraint violated. Try reducing.');
    }

    if (numRoomsX > 2 && maxDoors < 2) {
        throw new Error('Floor plan is not possible, need at least 2 doors per room');
    }

    if (numRoomsY > 1 && maxDoors < 2) {
        throw new Error('Floor plan is not possible, need at least 2 doors per room');
    }

    // Populate our grid of rooms
    const grid: Room[][] = [];

    for (let row = 0; row < numRoomsY; row++) {
        const rooms: Room[] = [];
        for (let col = 0; col < numRoomsX; col++) {
            const roomNumber = row * numRoomsX + (col + 1);

            const room: Room = {
                name: `Room ${roomNumber}`,
                width: roomX,
                length: roomY,
                x: col * roomX,
                y: row * roomY,
                numDoors: 0,
            };

            rooms.push(room);
        }
        grid.push(rooms);
    }

    // Now snake through the grid and
    // place our doors

    const doors: Door[] = [];
    let row = 0;
    let col = 0;
    let dir = 1; // right = 1, left = -1

    while (true) {
        const room = grid[row][col];

        const nextRoomInDir = grid[row]?.[col + dir] ?? null;

        if (nextRoomInDir) {
            const wall = dir === 1 ? 'r' : 'l';
            doors.push(getDoor(room, wall));
            room.numDoors = room.numDoors + 1;
            nextRoomInDir.numDoors = nextRoomInDir.numDoors + 1;
            col = col + dir;
            continue;
        }

        const nextRoomBelow = grid[row + 1]?.[col] ?? null;

        if (nextRoomBelow) {
            doors.push(getDoor(room, 'b'));
            room.numDoors = room.numDoors + 1;
            nextRoomBelow.numDoors = nextRoomBelow.numDoors + 1;
            row = row + 1;
            dir = dir * -1;
            continue;
        }

        // no more rooms
        break;
    }

    const rooms = grid.flat(1);

    // Check max doors
    rooms.forEach(room => {
        if (room.numDoors > maxDoors) {
            throw new Error(`${room.name} has too many doors.`);
        }
    });

    return prisma.floorPlan.create({
        data: {
            title,
            planX,
            planY,
            rooms,
            doors,
            userId,
        }
    });
}

const MIN_WALL_LENGTH = 4; // doors are 36" but need room for jamb

type Wall = 'r' | 'l' | 'b' | 't';

function getDoor(room: Room, wall: Wall): Door {
    const wallLength = getWallLength(room, wall);

    if (wallLength < MIN_WALL_LENGTH) {
        throw new Error(`${room.name}'s ${wall} wall is too short for a door.`);
    }

    const orientation = ['r', 'l'].includes(wall) ? 'vertical' : 'horizontal';

    return {
        ...getWallCenter(room, wall),
        orientation,
    }
}

function getWallLength(room: Room, wall: Wall): number {
    if (['r', 'l'].includes(wall)) {
        return room.length;
    }

    return room.width;
}

function getWallCenter(room: Room, wall: Wall): { cx: number, cy: number} {
    const roomCx = room.x + (room.width / 2);
    const roomCy = room.y + (room.length / 2);
    const roomRight = room.x + room.width;
    const RoomBottom = room.y + room.length;

    if (wall === 't') {
        return {
            cx: roomCx,
            cy: room.y,
        }
    }

    if (wall === 'r') {
        return {
            cx: roomRight,
            cy: roomCy,
        }
    }

    if (wall === 'b') {
        return {
            cx: roomCx,
            cy: RoomBottom,
        }
    }

    return {
        cx: room.x,
        cy: roomCy
    }
}
