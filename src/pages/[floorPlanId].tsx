import Layout from 'components/page/Layout';
import RenderFloorPlanSvg from 'components/RenderFloorPlanSvg';
import { useFloorPlan } from 'hooks/useFloorPlan';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

export interface FloorPlanViewerPageProps {}

const FloorPlanViewerPage: FC<FloorPlanViewerPageProps> = (props) => {
    const router = useRouter();
    const { floorPlan, isLoading, error } = useFloorPlan(
        router.query.floorPlanId as string
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    return (
        <Layout title={floorPlan?.title ?? ''}>
            <div
                className="overflow-hidden cursor-move"
            >
                <TransformWrapper
                    alignmentAnimation={{ disabled: true }}
                    centerOnInit
                    minScale={.1}
                    limitToBounds={false}
                >
                    <TransformComponent>
                        <RenderFloorPlanSvg floorPlan={floorPlan} />
                    </TransformComponent>
                </TransformWrapper>
            </div>
        </Layout>
    );
};

export async function getServerSideProps(context: NextPageContext) {
    const { req } = context;

    const session = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: '/api/auth/signin',
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
}

export default FloorPlanViewerPage;
