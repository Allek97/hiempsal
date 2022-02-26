/* eslint-disable react-hooks/rules-of-hooks */
import { CheckoutLineItemsAddPayload } from "@framework/schema";
import { Cart } from "@framework/types/cart";
import { MutationHook } from "@framework/types/hooks";
import { checkoutToCart, getCheckoutId } from "@framework/utils";
import { checkoutLineItemsAddMutation } from "@framework/utils/mutations";
import { useCart } from ".";

type AddItemHookDescriptor = {
    fetcherInput: {
        variantId: string;
        quantity: number;
    };
    fetcherOutput: {
        checkoutLineItemsAdd: CheckoutLineItemsAddPayload;
    };
    data: Cart;
};

const handler: MutationHook<AddItemHookDescriptor> = {
    fetcherOptions: {
        query: checkoutLineItemsAddMutation,
    },

    fetcher: async ({ fetch, options, input }) => {
        const variables = {
            checkoutId: getCheckoutId(),
            lineItems: [
                {
                    variantId: input.variantId,
                    quantity: 1,
                },
            ],
        };

        const { data } = await fetch({
            ...options,
            variables,
        });

        const cart = checkoutToCart(data.checkoutLineItemsAdd.checkout);
        return cart;
    },
    useHook:
        ({ fetch }) =>
        () => {
            const { mutate: updateCart } = useCart();

            return async (input) => {
                const response = await fetch(input);
                await updateCart(response, false);
                return response;
            };
        },
};

const useAddItem = () => {};

export default useAddItem;
