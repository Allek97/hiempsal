/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line import/no-cycle
import { getConfig } from "@framework/api/config";
import { checkoutToCart } from "@framework/utils";
import createCheckout from "@framework/utils/create-checkout";
import { getCheckoutQuery } from "@framework/utils/queries";
import { useSWRHook } from "@framework/utils/use-hooks";
import Cookies from "js-cookie";
import { useMemo } from "react";

export const handler = {
    fetcherOptions: {
        query: getCheckoutQuery,
    },
    async fetcher({ fetch, options, input: { checkoutId } }) {
        let checkout;

        if (checkoutId) {
            const { data } = await fetch({
                ...options,
                variables: {
                    checkoutId,
                },
            });

            checkout = data.node;
        } else {
            checkout = await createCheckout(fetch as any);
        }

        const cart = checkoutToCart(checkout);

        return cart;
    },
    useHook:
        ({ useData }: any) =>
        () => {
            const { checkoutCookie } = getConfig();
            const result = useData({
                swrOptions: {
                    revalidata: false,
                },
            });

            if (result.data?.completedAt) {
                Cookies.remove(checkoutCookie);
            }

            return useMemo(() => {
                return {
                    ...result,
                    isEmpty: (result.data?.lineItems.length ?? 0) <= 0,
                };
            }, [result]);
        },
};

const useCart = () => {
    const { checkoutCookie } = getConfig();

    const fetcherWrapper: typeof handler.fetcher = (context) => {
        context.input.checkoutId = Cookies.get(checkoutCookie);
        return handler.fetcher(context);
    };

    return useSWRHook({ ...handler, fetcher: fetcherWrapper });
};

export default useCart;
