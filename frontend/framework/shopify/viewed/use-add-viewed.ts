/* eslint-disable react-hooks/rules-of-hooks */
// https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/

// TODO Need to implement a good architecture to handle my rest api with/without
// SWR Hook

import { getConfig } from "@framework/api/config";
import { Product } from "@framework/types/product";
import { Viewed } from "@framework/types/viewed";
import { getViewedToken } from "@framework/utils/viewed-token";
import useViewed from "./use-viewed";

type Input = {
    product: Product;
};

type UseAddViewed = (input: Input) => Promise<Viewed>;

const useAddViewed = (): UseAddViewed => {
    const { fetchRest } = getConfig();
    const viewedToken = getViewedToken();

    async function fetch(product: Product) {
        const { data } = await fetchRest<Viewed>({
            url: `/api/viewed?_id=${viewedToken}`,
            method: "PATCH",
            body: {
                product,
            },
        });

        return data;
    }

    const useHook = () => {
        return () => {
            const getViewed = useViewed();
            const { mutate: updateViewedProducts } = getViewed({
                viewedToken: viewedToken,
            });

            return async ({ product }: Input) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const viewedProducts = await fetch(product);

                await updateViewedProducts(viewedProducts, true);

                return viewedProducts;
            };
        };
    };

    return useHook()();
};

export default useAddViewed;
