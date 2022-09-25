/* eslint-disable react-hooks/rules-of-hooks */
import { ApiConfig } from "@framework/types/api";
import { Wishlist } from "@framework/types/wishlist";

const isProductWishlisted = async (options: {
    config: ApiConfig;
    productId: string;
    wishlistToken: string;
    url: string;
}): Promise<boolean> => {
    const { config, productId, wishlistToken, url } = options;
    const { fetchRest } = config;

    const { data } = await fetchRest<Wishlist | null>({
        url: `${url}/api/wishlist?_id=${wishlistToken}&productId=${productId}`,
        method: "GET",
    });

    return !!data?.products.length;
};

export default isProductWishlisted;
