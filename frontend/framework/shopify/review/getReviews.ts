/* eslint-disable react-hooks/rules-of-hooks */
import { ApiConfig } from "@framework/types/api";
import { Review } from "@framework/types/review";

const getReviews = async (options: {
    config: ApiConfig;
    productId: string;
    url: string;
}): Promise<Review[]> => {
    const { config, productId, url } = options;
    const { fetchRest } = config;

    const { data } = await fetchRest<Review[]>({
        url: `${url}/api/reviews/?productId=${productId}`,
        method: "GET",
    });

    return data;
};

export default getReviews;
