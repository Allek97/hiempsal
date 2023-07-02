import { ApiConfig } from "@framework/types/api";
import { Customer as ShopifyCustomer } from "@framework/schema";
import { getCustomerIdQuery } from "@framework/utils";

type FetchOutput = {
    customer: ShopifyCustomer;
};

const getCustomerId = async (options: {
    config: ApiConfig;
    customerAccessToken: string | undefined;
}): Promise<string | null> => {
    const { config, customerAccessToken } = options;

    if (customerAccessToken) {
        const { data } = await config.fetch<FetchOutput>({
            query: getCustomerIdQuery,
            variables: {
                customerAccessToken: customerAccessToken,
            },
        });

        if (!data || !data?.customer) return null;

        return data.customer.id;
    }

    return null;
};

export default getCustomerId;
