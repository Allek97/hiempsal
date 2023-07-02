/* eslint-disable react-hooks/rules-of-hooks */
import { ApiConfig } from "@framework/types/api";
import { Checkout } from "@framework/schema";
import getCustomer from "@framework/customer/get-customer";
import { checkoutToCart, getCheckoutQuery } from "@framework/utils";
import { Cart } from "@framework/types/cart";
import createCheckout from "@framework/utils/create-checkout";
import useAssociateCustomer from "./use-associate-customer";

type FetchOutput = {
    node: Checkout;
};

const getCart = async (options: {
    config: ApiConfig;
    customerAccessToken: string | undefined;
    checkoutId: string | undefined;
}): Promise<Cart> => {
    const { checkoutId, config, customerAccessToken } = options;
    let checkout: Checkout | null = null;
    if (customerAccessToken) {
        const customer = await getCustomer({
            config,
            customerAccessToken,
        });
        if (
            customer?.lastIncompleteCheckout &&
            !customer?.lastIncompleteCheckout.completedAt &&
            customer?.lastIncompleteCheckout.webUrl
        )
            checkout = customer?.lastIncompleteCheckout;
    }

    if (!checkout) {
        if (checkoutId) {
            const { data } = await config.fetch<FetchOutput>({
                query: getCheckoutQuery,
                variables: {
                    checkoutId,
                },
            });

            if (data.node && !data.node.completedAt && data.node.webUrl)
                checkout = data.node;
        }

        if (!checkout) {
            checkout = await createCheckout(config.fetch);
        }
    }

    if (customerAccessToken) {
        const associateCustomer = useAssociateCustomer();
        await associateCustomer({
            checkoutId: checkout.id,
            customerAccessToken,
        });
    }

    const cart = checkoutToCart(checkout);
    // Associate and disassociate customer to the checkout

    return cart;
};

export default getCart;
