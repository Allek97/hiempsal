import { ApiFetcherOptionsRest, ApiFetcherResults } from "@framework/types/api";
import axios, { AxiosError } from "axios";

const fetchRestApi = async <T>({
    url,
    body,
    method,
}: ApiFetcherOptionsRest): Promise<ApiFetcherResults<T>> => {
    try {
        const res = await axios({
            method: method,
            url: url,
            data: body && body,
        });

        const { data } = res.data;

        return { data };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error as AxiosError;
        } else {
            throw error;
        }
    }
};

export default fetchRestApi;
