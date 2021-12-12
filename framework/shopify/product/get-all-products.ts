import { ProductConnection } from "@framework/schema";
import { ApiConfig } from "@framework/types/api";
import { getAllProductsQuery } from "@framework/utils/queries";

type ReturnType = {
    products: ProductConnection;
};

const getAllProducts = async (config: ApiConfig): Promise<ReturnType> => {
    const { data } = await config.fetch<ReturnType>({
        query: getAllProductsQuery,
    });

    return data;
};

export default getAllProducts;
