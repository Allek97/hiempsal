/* eslint-disable react-hooks/rules-of-hooks */
import { ApiConfig } from "@framework/types/api";
import { Review } from "@framework/types/review";

const getReviewsSummary = async (options: {
    config: ApiConfig;
    productId: string;
    url: string;
}): Promise<Review[]> => {
    const { config, productId, url } = options;
    const { fetchRest } = config;

    const { data } = await fetchRest<Review[]>({
        url: `${url}/api/reviews/summary/${productId}`,
        method: "GET",
    });

    return data;
};

export default getReviewsSummary;
