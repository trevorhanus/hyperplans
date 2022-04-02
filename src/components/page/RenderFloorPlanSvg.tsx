import { FloorPlan } from '@prisma/client';
import React, { FC } from 'react';

export interface RenderFloorPlanSvgProps {
    floorPlan: FloorPlan;
}

// 1 unit = 1 inch

const RenderFloorPlanSvg: FC<RenderFloorPlanSvgProps> = ({ floorPlan }) => {
    const rooms = getRooms(floorPlan)

    const exteriorWalls = () => {
        return (
            <rect
                id="exterior-walls"
                stroke="#363636"
                strokeWidth="5"
                x="0"
                y="0"
                width={inches(floorPlan.planX)}
                height={inches(floorPlan.planY)}
            />
        );
    };

    const renderRoom = (room: Room) => {
        const centerX = room.x + (room.width / 2);
        const centerY = room.y + (room.height / 2);

        return (
            <>
                <rect
                    id={room.name}
                    stroke="#363636"
                    strokeWidth={2}
                    x={room.x}
                    y={room.y}
                    width={room.width}
                    height={room.height}
                />
                <text
                    fontFamily="Montserrat-Medium, Montserrat"
                    fontSize="16"
                    fontWeight="400"
                    fill="#363636"
                    x={centerX}
                    y={centerY}
                    dominantBaseline="middle"
                    textAnchor="middle"
                >
                    <tspan>
                        {room.name}
                    </tspan>
                </text>
            </>
        )
    };

    const planWidth = inches(floorPlan.planX);
    const planHeight = inches(floorPlan.planY);
    const imageWidth = 60 + planWidth + 60;
    const imageHeight = 60 + planHeight + 60;

    return (
        <svg
            width="100%"
            viewBox={`-60 -60 ${imageWidth} ${imageHeight}`}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g
                id="FloorPlan"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
            >
                {rooms.map(room => renderRoom(room))}
                {exteriorWalls()}

                <text
                    fontFamily="Montserrat-Medium, Montserrat"
                    fontSize="16"
                    fontWeight="400"
                    fill="#363636"
                    x={planWidth / 2}
                    y={-30}
                    dominantBaseline="middle"
                    textAnchor="middle"
                >
                    <tspan>
                        {floorPlan.planX}'
                    </tspan>
                </text>

                <text
                    fontFamily="Montserrat-Medium, Montserrat"
                    fontSize="16"
                    fontWeight="400"
                    fill="#363636"
                    x={-40}
                    y={planHeight / 2}
                    dominantBaseline="middle"
                    textAnchor="middle"
                >
                    <tspan>
                        {floorPlan.planY}'
                    </tspan>
                </text>

            </g>
            {/* <g
                id="Artboard"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
            >
                <text
                    id="40’"
                    font-family="Montserrat-Medium, Montserrat"
                    font-size="16"
                    font-weight="400"
                    fill="#363636"
                >
                    <tspan x="409.996" y="30">
                        40’
                    </tspan>
                </text>
                <text
                    id="20’"
                    font-family="Montserrat-Medium, Montserrat"
                    font-size="16"
                    font-weight="400"
                    fill="#363636"
                >
                    <tspan x="17.78" y="213">
                        20’
                    </tspan>
                </text>
            </g> */}
        </svg>
    );
};

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

export default RenderFloorPlanSvg;
