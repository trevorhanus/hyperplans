import { PlusCircleIcon } from '@heroicons/react/outline';
import Layout from 'components/page/Layout';
import RenderFloorPlanSvg from 'components/RenderFloorPlanSvg';
import { useFloorPlans } from 'hooks/useFloorPlans';
import type { NextPage, NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';

const FloorPlans: NextPage = () => {
    const { floorPlans, isLoading, error } = useFloorPlans();

    if (error) {
        return <div>Error!</div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Layout
            title="Floor Plans"
            action={(
                <Link href="/create">
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <PlusCircleIcon
                            className="w-5 h-5 mr-2 -ml-1"
                            aria-hidden="true"
                        />
                        Generate
                    </button>
                </Link>
            )}
        >
            <div>
                <ul
                    role="list"
                    className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
                >
                    {floorPlans.map((floorPlan) => (
                        <li key={floorPlan.id} className="relative">
                            <div className="block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-10 aspect-h-7 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500">
                                <RenderFloorPlanSvg
                                    floorPlan={floorPlan}
                                />
                                <a type="button" className="absolute inset-0 focus:outline-none"
                                href={`/${floorPlan.id}`}>
                                    <span className="sr-only">View details for {floorPlan.title}</span>
                                </a>
                            </div>
                            <p className="block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none">
                                {floorPlan.title}
                            </p>
                        </li>
                    ))}
                </ul>
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
            }
        }
    }
    
    return {
        props: {
            session,
        },
    };
}

export default FloorPlans;
