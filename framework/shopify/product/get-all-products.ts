import { ProductConnection } from "@framework/schema";
import { ApiConfig } from "@framework/types/api";
import { Product, ShopifyProductMeta } from "@framework/types/product";
import { normalizeProduct } from "@framework/utils/normalize";
import { getAllProductsQuery } from "@framework/utils/queries";

type ReturnType = {
    products: ProductConnection;
};

const getAllProducts = async (config: ApiConfig): Promise<Product[]> => {
    const {
        data: { products: shopifyProducts },
    } = await config.fetch<ReturnType>({
        query: getAllProductsQuery,
    });

    const products: Product[] = shopifyProducts.edges.map(
        ({ node: shopifyProduct }) =>
            normalizeProduct(shopifyProduct as ShopifyProductMeta)
    );

    return products;
};

export default getAllProducts;
