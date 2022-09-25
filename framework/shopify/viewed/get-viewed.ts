/* eslint-disable react-hooks/rules-of-hooks */
import { ApiConfig } from "@framework/types/api";
import { Viewed } from "@framework/types/viewed";
import _ from "underscore";

const getViewed = async (options: {
    config: ApiConfig;
    customerId: string | undefined;
    viewedToken: string | undefined;
    url?: "";
}): Promise<Viewed> => {
    const { config, customerId, viewedToken, url } = options;
    const { fetchRest } = config;

    let viewed;
    if (customerId) {
        const { data } = await fetchRest<Viewed | null>({
            url: `${url}/api/viewed?customerId=${customerId}`,
            method: "GET",
        });

        if (data) viewed = data;
    }

    if (viewedToken) {
        const { data } = await fetchRest<Viewed | null>({
            url: `${url}/api/viewed?_id=${viewedToken}`,
            method: "GET",
        });

        if (data) {
            if (viewed)
                viewed = {
                    ...viewed,
                    products: _.uniq(
                        viewed.products.concat(data.products),
                        "id"
                    ),
                };
            else viewed = data;
        }
    }

    if (!viewed) {
        const { data } = await fetchRest<Viewed>({
            url: `${url}/api/viewed`,
            method: "POST",
        });

        viewed = data;
    }

    if (customerId) {
        await fetchRest<Viewed>({
            url: `${url}/api/viewed?_id=${viewedToken ?? viewed._id}`,
            method: "PATCH",
            body: {
                customerId,
            },
        });
    }

    return viewed as Viewed;
};

export default getViewed;
