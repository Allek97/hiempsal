import { ApiFetcherOptionsRest, ApiFetcherResults } from "@framework/types/api";
import axios, { AxiosError } from "axios";

const fetchRestApi = async <T>({
    url,
    body,
}: ApiFetcherOptionsRest): Promise<ApiFetcherResults<T>> => {
    try {
        const res = await axios({
            method: body ? "POST" : "GET",
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
