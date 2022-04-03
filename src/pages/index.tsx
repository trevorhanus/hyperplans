import { PlusCircleIcon, ViewGridAddIcon } from '@heroicons/react/outline';
import { PlusIcon } from '@heroicons/react/solid';
import Layout from 'components/page/Layout';
import RenderFloorPlanSvg from 'components/RenderFloorPlanSvg';
import { useFloorPlans } from 'hooks/useFloorPlans';
import type { NextPage, NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';

const FloorPlans: NextPage = () => {
    const { floorPlans, isLoading, error } = useFloorPlans();

    if (error) {
        return <div>Error!</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const renderContent = () => {
        if (floorPlans?.length === 0) {
            return <EmptyState />;
        }

        return (
            <div>
                <ul
                    role="list"
                    className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
                >
                    {floorPlans.map((floorPlan) => (
                        <li key={floorPlan.id} className="relative">
                            <div className="block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-10 aspect-h-7 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500">
                                <RenderFloorPlanSvg floorPlan={floorPlan} />
                                <a
                                    type="button"
                                    className="absolute inset-0 focus:outline-none"
                                    href={`/${floorPlan.id}`}
                                >
                                    <span className="sr-only">
                                        View details for {floorPlan.title}
                                    </span>
                                </a>
                            </div>
                            <p className="block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none">
                                {floorPlan.title}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <Layout
            title="Floor Plans"
            action={
                <Link href="/create">
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-800 border border-transparent rounded-md shadow-sm bg-hyper-600 hover:bg-hyper-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hyper-500"
                    >
                        <PlusIcon
                            className="w-5 h-5 mr-2 -ml-1"
                            aria-hidden="true"
                        />
                        Generate
                    </button>
                </Link>
            }
        >
            {renderContent()}
        </Layout>
    );
};

function EmptyState() {
    return (
        <div className="text-center">
            <ViewGridAddIcon className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
                No Floor Plans
            </h3>
            <p className="mt-1 text-sm text-gray-500">
                Get started by generating a floor plan.
            </p>
            <div className="mt-6">
                <Link href="/create">
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-800 border border-transparent rounded-md shadow-sm bg-hyper-600 hover:bg-hyper-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hyper-500"
                    >
                        <PlusIcon
                            className="w-5 h-5 mr-2 -ml-1"
                            aria-hidden="true"
                        />
                        Generate
                    </button>
                </Link>
            </div>
        </div>
    );
}

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

export default FloorPlans;
