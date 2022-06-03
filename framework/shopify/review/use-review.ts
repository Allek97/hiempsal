/* eslint-disable react-hooks/rules-of-hooks */

import { getConfig } from "@framework/api/config";
import { Review } from "@framework/types/review";
import axios, { AxiosError } from "axios";
import { useMemo } from "react";
import useSWR, { SWRResponse } from "swr";

type FetcherContext = {
    productId?: string;
    userEmail?: string;
};

type UseReview = (
    input: FetcherContext
) => SWRResponse<Review[], any> & { isEmpty: boolean };

const useReview = (): UseReview => {
    const { fetchRest } = getConfig();

    const hookFetcher = async (url: string) => {
        try {
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

    const useData = (context: FetcherContext): SWRResponse<Review[], any> => {
        const { productId, userEmail } = context;
        const query = `?/${productId}&${userEmail}`;

        const result = useSWR(`/api/reviews${query}`, hookFetcher);

        return result;
    };

    return (input: FetcherContext) => {
        const swr = useData(input);

        const memoSwr = useMemo(() => {
            return {
                ...swr,
                isEmpty: (swr.data?.length ?? 0) <= 0,
            };
        }, [swr]);

        return memoSwr;
    };
};

export default useReview;
