/* eslint-disable react-hooks/rules-of-hooks */

import { getConfig } from "@framework/api/config";
import { Wishlist } from "@framework/types/wishlist";
import { setWishlistToken } from "@framework/utils/wishlist-token";
import axios, { AxiosError } from "axios";
import { useMemo } from "react";
import useSWR, { SWRResponse } from "swr";
import getWishlist from "./get-wishlist";

type FetcherContext = {
    wishlistToken?: string;
    customerId?: string;
};

type UseWishlist = (input: FetcherContext) => SWRResponse<Wishlist, any>;

const useWishlist = (): UseWishlist => {
    const config = getConfig();

    const fetcher = async (input: FetcherContext): Promise<Wishlist> => {
        const { customerId, wishlistToken } = input;

        const viewed = await getWishlist({
            config,
            customerId,
            wishlistToken,
            url: "",
        });

        setWishlistToken(viewed._id);

        return viewed;
    };

    const useData = (context: FetcherContext): SWRResponse<Wishlist, any> => {
        const hookFetcher = async () => {
            try {
                return await fetcher(context);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    throw error as AxiosError;
                } else throw new Error("different error than axios");
            }
        };

        const result = useSWR("/api/wishlist", hookFetcher);

        return result;
    };

    return (input: FetcherContext) => {
        const swr: SWRResponse<Wishlist, any> = useData(input);

        const memoSwr = useMemo(() => {
            return {
                ...swr,
            };
        }, [swr]);

        return memoSwr;
    };
};

export default useWishlist;
