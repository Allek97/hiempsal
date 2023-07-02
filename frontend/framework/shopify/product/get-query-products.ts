import { ProductConnection } from "@framework/schema";
import { ApiConfig } from "@framework/types/api";
import { Product, ShopifyProductMeta } from "@framework/types/product";
import { normalizeProduct } from "@framework/utils/normalize";
import { getQueryProductsQuery } from "@framework/utils/queries";

type ReturnType = {
    products: ProductConnection;
};

type Context = {
    config: ApiConfig;
    variables: {
        querySearch: string;
    };
};

const getQueryProducts = async (options: Context): Promise<Product[]> => {
    const { config, variables } = options;
    const {
        data: { products: shopifyProducts },
    } = await config.fetch<ReturnType>({
        query: getQueryProductsQuery,
        variables: variables,
    });

    const products: Product[] = shopifyProducts.edges.map(
        ({ node: shopifyProduct }) =>
            normalizeProduct(shopifyProduct as ShopifyProductMeta)
    );

    return products;
};

export default getQueryProducts;
