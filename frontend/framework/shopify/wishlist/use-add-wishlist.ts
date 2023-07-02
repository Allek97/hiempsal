/* eslint-disable react-hooks/rules-of-hooks */
// https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/

// TODO Need to implement a good architecture to handle my rest api with/without
// SWR Hook

import { getConfig } from "@framework/api/config";
import { Product } from "@framework/types/product";
import { Wishlist } from "@framework/types/wishlist";
import { getWishlistToken } from "@framework/utils/wishlist-token";
import useWishlist from "./use-wishlist";

type Input = {
    product: Product;
};

type UseAddWishlist = (input: Input) => Promise<Wishlist>;

const useAddWishlist = (): UseAddWishlist => {
    const { fetchRest } = getConfig();
    const wishlistToken = getWishlistToken();

    async function fetch(product: Product) {
        const { data } = await fetchRest<Wishlist>({
            url: `/api/wishlist?_id=${wishlistToken}`,
            method: "PATCH",
            body: {
                product,
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

            return async ({ product }: Input) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const wishlist = await fetch(product);

                await updateWishlist(wishlist, true);

                return wishlist;
            };
        };
    };

    return useHook()();
};

export default useAddWishlist;
