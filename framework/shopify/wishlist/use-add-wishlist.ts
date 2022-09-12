/* eslint-disable react-hooks/rules-of-hooks */
// https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/

// TODO Need to implement a good architecture to handle my rest api with/without
// SWR Hook

import { getConfig } from "@framework/api/config";
import { Wishlist } from "@framework/types/wishlist";
import { getWishlistToken } from "@framework/utils/wishlist-token";
import useWishlist from "./use-wishlist";

type Input = {
    slug: string;
};

type UseAddWishlist = (input: Input) => Promise<Wishlist>;

const useAddWishlist = (): UseAddWishlist => {
    const { fetchRest } = getConfig();
    const wishlistToken = getWishlistToken();

    async function fetch(slug: string) {
        const { data } = await fetchRest<Wishlist>({
            url: "/api/wishlist",
            method: "PATCH",
            body: {
                _id: wishlistToken,
                slug,
            },
        });

        return data;
    }

    const useHook = () => {
        return () => {
            const getWishlist = useWishlist();
            const { mutate: updateWishlist } = getWishlist({
                wishlistToken: wishlistToken,
            });

            return async ({ slug }: Input) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const wishlist = await fetch(slug);

                await updateWishlist(wishlist, false);

                return wishlist;
            };
        };
    };

    return useHook()();
};

export default useAddWishlist;
