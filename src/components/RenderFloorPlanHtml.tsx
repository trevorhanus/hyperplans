import { FloorPlan } from '@prisma/client';
import React, { FC } from 'react';

export interface RenderFloorPlanHtmlProps {
    floorPlan: FloorPlan;
}

const RenderFloorPlanHtml: FC<RenderFloorPlanHtmlProps> = props => {
    return (
        <div
            className="bg-blue-200"
            style={{
                width: 1000,
                height: 1000
            }}
        >
            <div
                style={{
                    border: '1px solid',
                    left: 0,
                    top: 0,
                    width: 500,
                    height: 500
                }}
            />
        </div>
    );
}

interface Room {
    name: string;
    height: number;
    width: number;
    x: number;
    y: number;
}

const getRooms = (floorPlan: FloorPlan) => {
    const {
        numRoomsX,
        numRoomsY,
        planX,
        planY,
    } = floorPlan;

    const roomX = planX / numRoomsX;
    const roomY = planY / numRoomsY;

    const rooms: Room[] = [];

    const cols = new Array(numRoomsX).fill(1);
    const rows = new Array(numRoomsY).fill(1);

    rows.forEach((_, row) => {
        cols.forEach((_, col) => {
            const roomNum = row * cols.length + (col + 1);
            rooms.push({
                name: `Room ${roomNum}`,
                height: inches(roomY),
                width: inches(roomX),
                x: inches(col * roomX),
                y: inches(row * roomY),
            });
        });
    });

    return rooms;
}

const inches = (ft: number) => ft * 12;

export default RenderFloorPlanHtml;
