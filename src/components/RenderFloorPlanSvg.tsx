import { FloorPlan } from '@prisma/client';
import React, { FC } from 'react';

export interface RenderFloorPlanSvgProps {
    floorPlan: FloorPlan;
}

// 1 unit = 1 inch

const RenderFloorPlanSvg: FC<RenderFloorPlanSvgProps> = ({ floorPlan }) => {
    const { rooms, doors } = floorPlan;

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

    const renderRoom = (room) => {
        const centerX = inches(room.x + (room.width / 2));
        const centerY = inches(room.y + (room.length / 2));

        return (
            <>
                <rect
                    id={room.name}
                    stroke="#363636"
                    strokeWidth={2}
                    x={inches(room.x)}
                    y={inches(room.y)}
                    width={inches(room.width)}
                    height={inches(room.length)}
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

    const renderDoor = (door) => {
        let width = 4;
        let height = 36;

        if (door.orientation === 'horizontal') {
            width = 36;
            height = 4;
        }

        return (
            <rect
                width={width}
                height={height}
                x={inches(door.cx) - width / 2}
                y={inches(door.cy) - height / 2}
                fill="#fff"
                stroke="#363636"
                strokeWidth={1}
            />
        )
    };

    const planWidth = inches(floorPlan.planX);
    const planHeight = inches(floorPlan.planY);
    const imageWidth = 60 + planWidth + 60;
    const imageHeight = 60 + planHeight + 60;

    return (
        <svg
            width={imageWidth}
            height={imageHeight}
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
                {rooms.map(room => {
                    return (
                        <React.Fragment key={room.name}>
                            {renderRoom(room)}
                        </React.Fragment>
                    )
                })}

                {doors.map((door, i) => {
                    return (
                        <React.Fragment key={i}>
                            {renderDoor(door)}
                        </React.Fragment>
                    )
                })}

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
        </svg>
    );
};

const inches = (ft: number) => ft * 12;

export default RenderFloorPlanSvg;
