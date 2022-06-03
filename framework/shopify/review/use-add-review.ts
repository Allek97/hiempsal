// https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/

// NOTE I'm just gonna use a simple post request when creating a review
// No need to mutate the cached data with SWR since we are going to directely
// get all the reviews from serverSideProps

// TODO Need to implement a good architecture to handle my rest api with/without
// SWR Hook

import { getConfig } from "@framework/api/config";
import { Review } from "@framework/types/review";
import axios, { AxiosError } from "axios";

type ReviewReturn = (input: Review) => Promise<Review>;

const useAddReview = (): ReviewReturn => {
    const { fetchRest } = getConfig();

    return async (input: Review) => {
        try {
            const { data } = await fetchRest<Review>({
                url: "/api/reviews",
                body: input,
            });
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error as AxiosError;
            }
            throw new Error("different error than axios");
        }
    };
};

export default useAddReview;
