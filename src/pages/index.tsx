import Layout2 from 'components/page/Layout2';
import RenderFloorPlanSvg from 'components/page/RenderFloorPlanSvg';
import { useFloorPlans } from 'hooks/useFloorPlans';
import type { NextPage, NextPageContext } from 'next';

const Home: NextPage = () => {
    const { floorPlans, isLoading, error } = useFloorPlans();

    if (error) {
        return <div>Error!</div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Layout2
            title="Floor Plans"
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
        </Layout2>
    );
};

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {},
    };
}

export default Home;
