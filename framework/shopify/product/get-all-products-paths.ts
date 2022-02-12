import { ProductConnection } from "@framework/schema";
import { ApiConfig } from "@framework/types/api";
import { Product } from "@framework/types/product";
import getAllProductsPathsQuery from "@framework/utils/queries/get-all-products-paths";

type FetchReturnType = {
    products: ProductConnection;
};

type ReturnType = {
    products: Pick<Product, "slug">[];
};

const getAllProductsPaths = async (config: ApiConfig): Promise<ReturnType> => {
    const {
        data: { products: shopifyProducts },
    } = await config.fetch<FetchReturnType>({
        query: getAllProductsPathsQuery,
    });

    const products = shopifyProducts.edges.map(({ node: { handle } }) => ({
        slug: handle,
    }));

    return { products };
};

export default getAllProductsPaths;
