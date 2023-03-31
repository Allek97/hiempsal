/* eslint-disable react-hooks/rules-of-hooks */

import { getConfig } from "@framework/api/config";
import { normalizeShopifyId } from "@framework/utils/handleShopifyId";
import axios, { AxiosError } from "axios";
import { useMemo } from "react";
import useSWR, { SWRResponse } from "swr";

type FetcherContext = {
    productId: string;
};

type ReviewSummary = {
    ratingsAverage: number;
    reviewsCount: number;
};

type UseReviewSummary = (
    input: FetcherContext
) => SWRResponse<ReviewSummary, any>;

const useReviewSummary = (): UseReviewSummary => {
    const { fetchRest } = getConfig();

    const fetcher = async (query: string): Promise<ReviewSummary> => {
        const { data } = await fetchRest<ReviewSummary>({
            url: query,
            method: "GET",
        });

        return data;
    };

    const useData = (
        context: FetcherContext
    ): SWRResponse<ReviewSummary, any> => {
        const hookFetcher = async (url: string) => {
            try {
                return await fetcher(url);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    throw error as AxiosError;
                } else throw new Error("different error than axios");
            }
        };

        const { productId } = context;

        const id = normalizeShopifyId(productId);

        const result = useSWR(`/api/reviews/summary/${id}`, hookFetcher);

        return result;
    };

    return (input: FetcherContext) => {
        const swr: SWRResponse<ReviewSummary, any> = useData(input);

        const memoSwr = useMemo(() => {
            return {
                ...swr,
            };
        }, [swr]);

        return memoSwr;
    };
};

export default useReviewSummary;
