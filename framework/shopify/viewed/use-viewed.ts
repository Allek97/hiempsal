/* eslint-disable react-hooks/rules-of-hooks */

import { getConfig } from "@framework/api/config";
import { Viewed } from "@framework/types/viewed";
import { setViewedToken } from "@framework/utils/viewed-token";
import axios, { AxiosError } from "axios";
import { useMemo } from "react";
import useSWR, { SWRResponse } from "swr";
import getViewed from "./get-viewed";

type FetcherContext = {
    viewedToken?: string;
    customerId?: string;
};

type UseViewed = (input: FetcherContext) => SWRResponse<Viewed, any>;

const useViewed = (): UseViewed => {
    const config = getConfig();

    const fetcher = async (input: FetcherContext): Promise<Viewed> => {
        const { customerId, viewedToken } = input;

        const viewed = await getViewed({
            config,
            customerId,
            viewedToken,
        });

        setViewedToken(viewed._id);

        return viewed;
    };

    const useData = (context: FetcherContext): SWRResponse<Viewed, any> => {
        const hookFetcher = async () => {
            try {
                return await fetcher(context);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    throw error as AxiosError;
                } else throw new Error("different error than axios");
            }
        };

        const result = useSWR("/api/viewed", hookFetcher);

        return result;
    };

    return (input: FetcherContext) => {
        const swr: SWRResponse<Viewed, any> = useData(input);

        const memoSwr = useMemo(() => {
            return {
                ...swr,
            };
        }, [swr]);

        return memoSwr;
    };
};

export default useViewed;
