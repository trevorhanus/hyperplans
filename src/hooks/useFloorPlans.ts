import { FloorPlan  } from '@prisma/client';
import useSWR from 'swr';
import { swrFetcher } from 'utils/fetcher';

export interface UseFloorPlansHook {
    floorPlans: FloorPlan[];
}

export const useFloorPlans = () => {
    const { data, error } = useSWR<{ floorPlans: FloorPlan[] }>('/api/floor-plans', swrFetcher);

    return {
        isLoading: !data && !error,
        error,
        floorPlans: data?.floorPlans,
    }
};
