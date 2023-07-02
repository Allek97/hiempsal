/* eslint-disable react-hooks/rules-of-hooks */
import { CheckoutLineItemsRemovePayload } from "@framework/schema";
import { Cart } from "@framework/types/cart";
import { MutationHook } from "@framework/types/hooks";
import { checkoutToCart, getCheckoutId } from "@framework/utils";
import { checkoutLineItemsRemoveMutation } from "@framework/utils/mutations";
import { useMutationHook } from "@framework/utils/use-hooks";
import useCart from "./use-cart";

type RemoveItemHookDescriptor = {
    fetcherInput: {
        lineItemId: string;
    };
    fetcherOutput: {
        checkoutLineItemsRemove: CheckoutLineItemsRemovePayload;
    };
    data: Cart;
};

type UseRemoveItem<H extends MutationHook> = ReturnType<H["useHook"]>;

const handler: MutationHook<RemoveItemHookDescriptor> = {
    fetcherOptions: {
        query: checkoutLineItemsRemoveMutation,
    },

    fetcher: async ({ fetch, options, input }) => {
        const variables = {
            checkoutId: getCheckoutId(),
            lineItemIds: [input.lineItemId],
        };

        const { data } = await fetch({
            ...options,
            variables,
        });

        const cart = checkoutToCart(data.checkoutLineItemsRemove.checkout);
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

const useRemoveItem: UseRemoveItem<typeof handler> = () => {
    return useMutationHook({ ...handler })();
};

export default useRemoveItem;
