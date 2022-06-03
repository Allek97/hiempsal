/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line import/no-cycle
import { getConfig } from "@framework/api/config";
import { Checkout, CheckoutCreatePayload } from "@framework/schema";
import { ApiFetcher } from "@framework/types/api";
import { Cart } from "@framework/types/cart";
import { SWRHook } from "@framework/types/hooks";
import { checkoutToCart } from "@framework/utils";
import createCheckout from "@framework/utils/create-checkout";
import { getCheckoutQuery } from "@framework/utils/queries";
import { useSWRHook } from "@framework/utils/use-hooks";

import Cookies from "js-cookie";
import { useMemo } from "react";

type UseCartHookDescriptor = {
    fetcherInput: {
        checkoutId: string;
    };
    fetcherOutput: {
        node: Checkout;
    };
    data: Cart;
};

type UseCart<H extends SWRHook> = ReturnType<H["useHook"]>;

const handler: SWRHook<UseCartHookDescriptor> = {
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
            checkout = await createCheckout(
                fetch as unknown as ApiFetcher<{
                    checkoutCreate: CheckoutCreatePayload;
                }>
            );
        }

        const cart = checkoutToCart(checkout);

        return cart;
    },
    useHook:
        ({ useData }) =>
        () => {
            const { checkoutCookie } = getConfig();
            const result = useData({
                swrOptions: {
                    revalidate: false,
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

const useCart: UseCart<typeof handler> = () => {
    const { checkoutCookie } = getConfig();

    const fetcherWrapper: typeof handler.fetcher = (context: any) => {
        context.input.checkoutId = Cookies.get(checkoutCookie);
        return handler.fetcher(context);
    };

    return useSWRHook({ ...handler, fetcher: fetcherWrapper })();
};

export default useCart;
