/* eslint-disable react-hooks/rules-of-hooks */
import { WEBSITE_API_URL } from "@framework/const";
import { ApiConfig } from "@framework/types/api";
import { Review } from "@framework/types/review";

const getReviews = async (options: {
    config: ApiConfig;
    productId: string;
}): Promise<Review[]> => {
    const { config, productId } = options;
    const { fetchRest } = config;

    const { data } = await fetchRest<Review[]>({
        url: `${WEBSITE_API_URL}/api/reviews/?productId=${productId}`,
        method: "GET",
    });

    return data;
};

export default getReviews;
