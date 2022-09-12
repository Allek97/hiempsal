/* eslint-disable react-hooks/rules-of-hooks */

import { getConfig } from "@framework/api/config";
import { Wishlist, WishlistServer } from "@framework/types/wishlist";
import { setWishlistToken } from "@framework/utils/wishlist-token";
import axios, { AxiosError } from "axios";
import { useMemo } from "react";
import useSWR, { SWRResponse } from "swr";
import _ from "underscore";

type FetcherContext = {
    wishlistToken?: string;
    customerId?: string;
};

type UseWishlist = (input: FetcherContext) => SWRResponse<Wishlist, any>;

const useWishlist = (): UseWishlist => {
    const { fetchRest } = getConfig();

    const fetcher = async (
        input: FetcherContext,
        query: string
    ): Promise<Wishlist> => {
        const { customerId, wishlistToken } = input;

        let wishlist;
        if (customerId) {
            const { data } = await fetchRest<Wishlist | null>({
                url: `${query}?customerId=${customerId}`,
                method: "GET",
            });

            if (data) wishlist = data;
        }

        if (wishlistToken) {
            const { data } = await fetchRest<Wishlist | null>({
                url: `${query}?_id=${wishlistToken}`,
                method: "GET",
            });

            if (data) {
                if (wishlist)
                    wishlist = {
                        ...wishlist,
                        products: _.uniq(
                            wishlist.products.concat(data.products),
                            "id"
                        ),
                    };
                else wishlist = data;
            }
        }

        if (!wishlist) {
            const { data } = await fetchRest<WishlistServer>({
                url: query,
                method: "POST",
            });

            wishlist = data;
        }

        if (customerId) {
            await fetchRest<WishlistServer>({
                url: query,
                method: "PATCH",
                body: {
                    customerId,
                    _id: wishlist._id,
                },
            });
        }

        setWishlistToken(wishlist._id);

        return wishlist as Wishlist;
    };

    const useData = (context: FetcherContext): SWRResponse<Wishlist, any> => {
        const hookFetcher = async (url: string) => {
            try {
                return await fetcher(context, url);
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
