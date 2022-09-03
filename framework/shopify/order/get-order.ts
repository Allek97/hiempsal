import { ApiConfig } from "@framework/types/api";
import { Order as ShopifyOrder } from "@framework/schema";

import { Order } from "@framework/types/order";
import { getOrderQuery } from "@framework/utils";
import { normalizeOrder } from "@framework/utils/normalize-customer";

type FetchType = {
    node: ShopifyOrder;
};

type ReturnType = {
    order: Order | null;
};

type VariableInput = {
    orderId: string;
};

const getOrder = async (options: {
    config: ApiConfig;
    variables: VariableInput;
}): Promise<ReturnType> => {
    const { config, variables } = options;

    const { data, errors } = await config.fetch<FetchType>({
        query: getOrderQuery,
        variables,
    });

    if (errors) throw new Error(errors[0].message);

    const { node } = data;

    return {
        order: normalizeOrder(node),
    };
};

export default getOrder;
