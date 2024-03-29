/* eslint-disable react-hooks/rules-of-hooks */
// https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/

// TODO Need to implement a good architecture to handle my rest api with/without
// SWR Hook

import { getConfig } from "@framework/api/config";
import { Question } from "@framework/types/question";

type UseAddQuestion = (
    input: Omit<Question, "answer" | "_id">
) => Promise<Omit<Question, "answer">>;

const useAddQuestion = (): UseAddQuestion => {
    const { fetchRest } = getConfig();

    return async (input: Omit<Question, "answer" | "_id">) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { data } = await fetchRest<Omit<Question, "answer">>({
            url: "/api/questions",
            body: input,
            method: "POST",
        });

        return data;
    };
};

export default useAddQuestion;
