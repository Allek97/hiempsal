import { checkoutToCart } from "@framework/utils";
import createCheckout from "@framework/utils/create-checkout";
import { getCheckoutQuery } from "@framework/utils/queries";

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
};
