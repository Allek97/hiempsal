import { ApiConfig } from "@framework/types/api";
import { Customer as ShopifyCustomer } from "@framework/schema";
import { Customer } from "@framework/types/customer";
import { normalizeCustomer } from "@framework/utils/normalize-customer";
import getCustomerQuery from "@framework/utils/queries/get-customer";

type FetchOutput = {
    customer: ShopifyCustomer;
};

const getCustomer = async (options: {
    config: ApiConfig;
    customerAccessToken: string | undefined;
}): Promise<Customer | null> => {
    const { config, customerAccessToken } = options;

    if (customerAccessToken) {
        const { data } = await config.fetch<FetchOutput>({
            query: getCustomerQuery,
            variables: {
                customerAccessToken: customerAccessToken,
            },
        });

        if (!data || !data?.customer) return null;

        const customer = normalizeCustomer(data.customer);

        return customer;
    }

    return null;
};

export default getCustomer;
