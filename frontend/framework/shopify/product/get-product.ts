import { ApiConfig, Variables } from "@framework/types/api";
import { Product, ShopifyProductMeta } from "@framework/types/product";
import { normalizeProduct } from "@framework/utils/normalize";

import getProductQuery from "@framework/utils/queries/get-product";

type FetchType = {
    product: ShopifyProductMeta;
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

    if (!product) throw new Error("No product with this slug/handle exists");

    return {
        product: normalizeProduct(product),
    };
};

export default getProduct;
