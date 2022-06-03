import { getConfig } from "@framework/api/config";
import { Review } from "@framework/types/review";
import axios, { AxiosError } from "axios";
import { useMemo } from "react";
import useSWR, { SWRResponse } from "swr";

type UseReview = SWRResponse<Review[], any> & { isEmpty: boolean };

const useReview = (): UseReview => {
    const { fetchRest } = getConfig();

    const hookFetcher = async (url: string) => {
        // eslint-disable-next-line no-useless-catch
        try {
            // eslint-disable-next-line @typescript-eslint/return-await
            const { data } = await fetchRest<Review[]>({
                url: url,
            });

            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error as AxiosError;
            } else throw new Error("different error than axios");
        }
    };

    const result = useSWR("/api/reviews", hookFetcher, {
        revalidateIfStale: false,
    });

    return useMemo(() => {
        return {
            ...result,
            isEmpty: (result.data?.length ?? 0) <= 0,
        };
    }, [result]);
};

export default useReview;
