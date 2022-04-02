import { FloorPlan } from '@prisma/client';
import useSWR from 'swr';
import { FetchError, swrFetcher } from 'utils/fetcher';

export interface UseFloorPlanHook {
    floorPlan?: FloorPlan;
    isLoading: boolean;
    error: FetchError;
}

export const useFloorPlan = (id: string): UseFloorPlanHook => {
    const path = id ? `/api/floor-plans/${id}` : null;
    const { data, error } = useSWR<FloorPlan>(path, swrFetcher);

    return {
        isLoading: !data && !error,
        error,
        floorPlan: data,
    }
};
