/* eslint-disable react-hooks/rules-of-hooks */
import { WEBSITE_API_URL } from "@framework/const";
import { ApiConfig } from "@framework/types/api";
import { Viewed } from "@framework/types/viewed";
import _ from "underscore";

const getViewed = async (options: {
    config: ApiConfig;
    customerId: string | undefined;
    viewedToken: string | undefined;
}): Promise<Viewed> => {
    const { config, customerId, viewedToken } = options;
    const { fetchRest } = config;

    let viewed;
    if (customerId) {
        const { data } = await fetchRest<Viewed | null>({
            url: `${WEBSITE_API_URL}/api/viewed?customerId=${customerId}`,
            method: "GET",
        });

        if (data) viewed = data;
    }

    if (viewedToken) {
        const { data } = await fetchRest<Viewed | null>({
            url: `${WEBSITE_API_URL}/api/viewed?_id=${viewedToken}`,
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
            url: `${WEBSITE_API_URL}/api/viewed`,
            method: "POST",
        });

        viewed = data;
    }

    if (customerId) {
        await fetchRest<Viewed>({
            url: `${WEBSITE_API_URL}/api/viewed?_id=${
                viewedToken ?? viewed._id
            }`,
            method: "PATCH",
            body: {
                customerId,
            },
        });
    }

    return viewed as Viewed;
};

export default getViewed;
