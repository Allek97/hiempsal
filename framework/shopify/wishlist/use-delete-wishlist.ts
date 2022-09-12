/* eslint-disable react-hooks/rules-of-hooks */
// https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/

// TODO Need to implement a good architecture to handle my rest api with/without
// SWR Hook

import { getConfig } from "@framework/api/config";
import { Wishlist } from "@framework/types/wishlist";
import { getWishlistToken } from "@framework/utils/wishlist-token";
import useWishlist from "./use-wishlist";

type Input = {
    productId: string;
};

type UseDeleteWishlist = (input: Input) => Promise<null>;

const useDeleteWishlist = (): UseDeleteWishlist => {
    const { fetchRest } = getConfig();
    const wishlistToken = getWishlistToken();

    async function fetch(productId: string) {
        const { data } = await fetchRest<Wishlist>({
            url: `/api/wishlist?_id=${wishlistToken}`,
            method: "DELETE",
            body: {
                productId,
            },
        });

        return data;
    }

    const useHook = () => {
        return () => {
            const getWishlist = useWishlist();
            const { data, mutate: updateWishlist } = getWishlist({
                wishlistToken: wishlistToken,
            });

            return async ({ productId }: Input) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks

                // eslint-disable-next-line react-hooks/rules-of-hooks
                await fetch(productId);

                if (data) {
                    const newProducts = data?.products.filter(
                        (product) => product.id !== productId
                    );
                    data.products = newProducts;
                    updateWishlist(data, false);
                } else await updateWishlist();

                return null;
            };
        };
    };

    return useHook()();
};

export default useDeleteWishlist;
