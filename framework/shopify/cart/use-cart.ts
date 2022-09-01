/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line import/no-cycle
import { getConfig } from "@framework/api/config";
import getCustomer from "@framework/customer/get-customer";
import { Checkout, CheckoutCreatePayload } from "@framework/schema";
import { ApiFetcher } from "@framework/types/api";
import { Cart } from "@framework/types/cart";
import { SWRHook } from "@framework/types/hooks";
import { checkoutToCart, setCheckout } from "@framework/utils";
import createCheckout from "@framework/utils/create-checkout";
import { getCheckoutQuery } from "@framework/utils/queries";
import { useSWRHook } from "@framework/utils/use-hooks";

import Cookies from "js-cookie";
import { useMemo } from "react";
import useAssociateCustomer from "./use-associate-customer";

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
    async fetcher({
        fetch,
        options,
        input: { checkoutId, customerAccessToken },
    }) {
        let checkout: Checkout | null = null;
        if (customerAccessToken) {
            const config = getConfig();
            const customer = await getCustomer({
                config,
                customerAccessToken,
            });
            if (customer?.lastIncompleteCheckout)
                checkout = customer?.lastIncompleteCheckout;
        }

        if (!checkout) {
            if (checkoutId) {
                const { data } = await fetch({
                    ...options,
                    variables: {
                        checkoutId,
                    },
                });

                if (data.node) checkout = data.node;
            }

            if (!checkout) {
                checkout = await createCheckout(
                    fetch as unknown as ApiFetcher<{
                        checkoutCreate: CheckoutCreatePayload;
                    }>
                );
            }
        }

        if (customerAccessToken) {
            const associateCustomer = useAssociateCustomer();
            await associateCustomer({
                checkoutId: checkout.id,
                customerAccessToken,
            });
        }

        setCheckout({
            checkoutId: checkout.id,
            checkoutUrl: checkout.webUrl,
        });
        const cart = checkoutToCart(checkout);
        // Associate and disassociate customer to the checkout

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
