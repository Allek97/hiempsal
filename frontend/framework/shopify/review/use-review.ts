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

    const fetcher = async (query: string): Promise<Review[]> => {
        const { data } = await fetchRest<Review[]>({
            url: query,
            method: "GET",
        });

        return data;
    };

    const useData = (context: FetcherContext): SWRResponse<Review[], any> => {
        const hookFetcher = async (url: string) => {
            try {
                return await fetcher(url);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    throw error as AxiosError;
                } else throw new Error("different error than axios");
            }
        };

        const { productId, userEmail } = context;
        let query = "";

        if (productId && userEmail)
            query = `?productId=${productId}&email=${userEmail}`;
        else if (productId) query = `?productId=${productId}`;
        else if (userEmail) query = `?email=${userEmail}`;
        else query = "";

        const result = useSWR(`/api/reviews${query}`, hookFetcher);

        return result;
    };

    return (input: FetcherContext) => {
        const swr: SWRResponse<Review[], any> = useData(input);

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
