/* eslint-disable react-hooks/rules-of-hooks */
import { CheckoutLineItemsUpdatePayload } from "@framework/schema";
import { Cart } from "@framework/types/cart";
import { MutationHook } from "@framework/types/hooks";
import { checkoutToCart, getCheckoutId } from "@framework/utils";
import { checkoutLineItemsUpdateMutation } from "@framework/utils/mutations";
import { useMutationHook } from "@framework/utils/use-hooks";
import useCart from "./use-cart";

type RemoveItemHookDescriptor = {
    fetcherInput: {
        lineItemId: string;
        quantity: number;
        variantId: string;
    };
    fetcherOutput: {
        checkoutLineItemsUpdate: CheckoutLineItemsUpdatePayload;
    };
    data: Cart;
};

type UseUpdateItem<H extends MutationHook> = ReturnType<H["useHook"]>;

const handler: MutationHook<RemoveItemHookDescriptor> = {
    fetcherOptions: {
        query: checkoutLineItemsUpdateMutation,
    },

    fetcher: async ({ fetch, options, input }) => {
        const variables = {
            checkoutId: getCheckoutId(),
            lineItems: [
                {
                    id: input.lineItemId,
                    quantity: input.quantity,
                    variantId: input.variantId,
                },
            ],
        };

        const { data } = await fetch({
            ...options,
            variables,
        });

        const cart = checkoutToCart(data.checkoutLineItemsUpdate.checkout);
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

const useUpdateItem: UseUpdateItem<typeof handler> = () => {
    return useMutationHook({ ...handler })();
};

export default useUpdateItem;
