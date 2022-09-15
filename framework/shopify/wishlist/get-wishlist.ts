/* eslint-disable react-hooks/rules-of-hooks */
import { WEBSITE_API_URL } from "@framework/const";
import { ApiConfig } from "@framework/types/api";
import { Wishlist } from "@framework/types/wishlist";
import _ from "underscore";

const getWishlist = async (options: {
    config: ApiConfig;
    customerId: string | undefined;
    wishlistToken: string | undefined;
}): Promise<Wishlist> => {
    const { config, customerId, wishlistToken } = options;
    const { fetchRest } = config;

    let wishlist;
    if (customerId) {
        const { data } = await fetchRest<Wishlist | null>({
            url: `${WEBSITE_API_URL}/api/wishlist?customerId=${customerId}`,
            method: "GET",
        });

        if (data) wishlist = data;
    }

    if (wishlistToken) {
        const { data } = await fetchRest<Wishlist | null>({
            url: `${WEBSITE_API_URL}/api/wishlist?_id=${wishlistToken}`,
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
        const { data } = await fetchRest<Wishlist>({
            url: `${WEBSITE_API_URL}/api/wishlist`,
            method: "POST",
        });

        wishlist = data;
    }

    if (customerId) {
        await fetchRest<Wishlist>({
            url: `${WEBSITE_API_URL}/api/wishlist?_id=${
                wishlistToken ?? wishlist._id
            }`,
            method: "PATCH",
            body: {
                customerId,
            },
        });
    }

    return wishlist as Wishlist;
};

export default getWishlist;
