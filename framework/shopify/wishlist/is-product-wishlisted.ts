/* eslint-disable react-hooks/rules-of-hooks */
import { WEBSITE_API_URL } from "@framework/const";
import { ApiConfig } from "@framework/types/api";
import { Wishlist } from "@framework/types/wishlist";

const isProductWishlisted = async (options: {
    config: ApiConfig;
    productId: string;
    wishlistToken: string;
}): Promise<boolean> => {
    const { config, productId, wishlistToken } = options;
    const { fetchRest } = config;

    const { data } = await fetchRest<Wishlist | null>({
        url: `${WEBSITE_API_URL}/api/wishlist?_id=${wishlistToken}&productId=${productId}`,
        method: "GET",
    });

    return !!data?.products.length;
};

export default isProductWishlisted;
