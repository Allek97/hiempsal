import { ApiFetcherOptionsRest, ApiFetcherResults } from "@framework/types/api";
import axios from "axios";

const fetchRestApi = async <T>({
    url,
    body,
}: ApiFetcherOptionsRest): Promise<ApiFetcherResults<T>> => {
    const res = await axios({
        method: body ? "POST" : "GET",
        url: url,
        data: body && body,
    });

    const { data } = res.data;

    return { data };
};

export default fetchRestApi;
