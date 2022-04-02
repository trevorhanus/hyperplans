import Layout2 from 'components/page/Layout2';
import RenderFloorPlanSvg from 'components/page/RenderFloorPlanSvg';
import { useFloorPlan } from 'hooks/useFloorPlan';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

export interface FloorPlanViewerPageProps {
}

const FloorPlanViewerPage: FC<FloorPlanViewerPageProps> = props => {
    const router = useRouter();
    const { floorPlan, isLoading, error } = useFloorPlan(router.query.floorPlanId as string);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error.message}</div>
    }

    return (
        <Layout2
            title={floorPlan?.title ?? ''}
        >
            <div>
                <RenderFloorPlanSvg
                    floorPlan={floorPlan}
                />
            </div>
        </Layout2>
    );
}

export default FloorPlanViewerPage;
