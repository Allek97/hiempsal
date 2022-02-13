import { Product as ShopifyProduct } from "@framework/schema";
import { ApiConfig, Variables } from "@framework/types/api";
import { Product } from "@framework/types/product";
import { normalizeProduct } from "@framework/utils/normalize";

import getProductQuery from "@framework/utils/queries/get-product";

type FetchType = {
    product: ShopifyProduct;
};

type ReturnType = {
    product: Product | null;
};

const getProduct = async (options: {
    config: ApiConfig;
    variables: Variables;
}): Promise<ReturnType> => {
    const { config, variables } = options;

    const { data } = await config.fetch<FetchType>({
        query: getProductQuery,
        variables,
    });

    const { product } = data;

    return {
        product: normalizeProduct(product),
    };
};

export default getProduct;
