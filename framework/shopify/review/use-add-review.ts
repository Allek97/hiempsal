/* eslint-disable react-hooks/rules-of-hooks */
// https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/

// TODO Need to implement a good architecture to handle my rest api with/without
// SWR Hook

import { getConfig } from "@framework/api/config";
import { Review } from "@framework/types/review";

type UseAddReview = (
    input: Omit<Review, "ratingsAverage">
) => Promise<Omit<Review, "ratingsAverage">>;

const useAddReview = (): UseAddReview => {
    const { fetchRest } = getConfig();

    return async (input: Omit<Review, "ratingsAverage">) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { data } = await fetchRest<Omit<Review, "ratingsAverage">>({
            url: "/api/reviews",
            body: input,
            method: "POST",
        });

        return data;
    };
};

export default useAddReview;
