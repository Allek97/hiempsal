/* eslint-disable react-hooks/rules-of-hooks */
// https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/

// NOTE I'm just gonna use a simple post request when creating a review
// No need to mutate the cached data with SWR since we are going to directely
// get all the reviews from serverSideProps

// TODO Need to implement a good architecture to handle my rest api with/without
// SWR Hook

import { getConfig } from "@framework/api/config";
import { Review } from "@framework/types/review";
import axios, { AxiosError } from "axios";
import useReview from "./use-review";

type UseAddReview = (
    input: Omit<Review, "ratingsAverage">
) => Promise<Omit<Review, "ratingsAverage">>;

const useAddReview = (): UseAddReview => {
    const { fetchRest } = getConfig();

    return async (input: Omit<Review, "ratingsAverage">) => {
        try {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { data } = await fetchRest<Omit<Review, "ratingsAverage">>({
                url: "/api/reviews",
                body: input,
            });

            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error as AxiosError;
            } else {
                throw error;
            }
        }
    };
};

export default useAddReview;
