/* eslint-disable react-hooks/rules-of-hooks */

import { getConfig } from "@framework/api/config";
import { Question } from "@framework/types/question";
import axios, { AxiosError } from "axios";
import { useMemo } from "react";
import useSWR, { SWRResponse } from "swr";

type FetcherContext = {
    productId?: string;
    userEmail?: string;
};

type UseQuestion = (
    input: FetcherContext
) => SWRResponse<Question[], any> & { isEmpty: boolean };

const useQuestion = (): UseQuestion => {
    const { fetchRest } = getConfig();

    const hookFetcher = async (url: string) => {
        try {
            const { data } = await fetchRest<Question[]>({
                url: url,
            });

            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error as AxiosError;
            } else throw new Error("different error than axios");
        }
    };

    const useData = (context: FetcherContext): SWRResponse<Question[], any> => {
        const { productId, userEmail } = context;
        let query = "";

        if (productId && userEmail)
            query = `?productId=${productId}&email=${userEmail}`;
        else if (productId) query = `?productId=${productId}`;
        else if (userEmail) query = `?email=${userEmail}`;
        else query = "";

        const result = useSWR(`/api/questions${query}`, hookFetcher);

        return result;
    };

    return (input: FetcherContext) => {
        const swr: SWRResponse<Question[], any> = useData(input);

        const memoSwr = useMemo(() => {
            return {
                ...swr,
                isEmpty: (swr.data?.length ?? 0) <= 0,
            };
        }, [swr]);

        return memoSwr;
    };
};

export default useQuestion;
