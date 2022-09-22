/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line import/no-cycle
import { getConfig } from "@framework/api/config";
import { Checkout } from "@framework/schema";
import { Cart } from "@framework/types/cart";
import { SWRHook } from "@framework/types/hooks";
import { setCheckout } from "@framework/utils";

import { getCheckoutQuery } from "@framework/utils/queries";
import { useSWRHook } from "@framework/utils/use-hooks";

import Cookies from "js-cookie";
import { useMemo } from "react";
import getCart from "./get-cart";

type UseCartHookDescriptor = {
    fetcherInput: {
        checkoutId: string | undefined;
        customerAccessToken: string | undefined;
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
    async fetcher({ input: { checkoutId, customerAccessToken } }) {
        const config = getConfig();
        const cart: Cart = await getCart({
            config: config,
            checkoutId,
            customerAccessToken,
        });

        setCheckout({
            checkoutId: cart.id,
            checkoutUrl: cart.webUrl,
        });

        return cart;
    },
    useHook:
        ({ useData }) =>
        () => {
            const { checkoutCookie } = getConfig();
            const result = useData({
                swrOptions: {
                    revalidateOnFocus: false,
                },
            });

            if (result.data?.completedAt) Cookies.remove(checkoutCookie);

            return useMemo(() => {
                return {
                    ...result,
                    isEmpty: (result.data?.lineItems.length ?? 0) <= 0,
                };
            }, [result]);
        },
};

const useCart: UseCart<typeof handler> = () => {
    const { checkoutCookie, customerTokenCookie } = getConfig();

    const fetcherWrapper: typeof handler.fetcher = (context: any) => {
        context.input.checkoutId = Cookies.get(checkoutCookie);
        context.input.customerAccessToken = Cookies.get(customerTokenCookie);
        return handler.fetcher(context);
    };

    return useSWRHook({ ...handler, fetcher: fetcherWrapper })();
};

export default useCart;
