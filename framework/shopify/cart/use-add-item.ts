/* eslint-disable react-hooks/rules-of-hooks */
import { CheckoutLineItemsAddPayload } from "@framework/schema";
import { Cart } from "@framework/types/cart";
import { MutationHook } from "@framework/types/hooks";
import { checkoutToCart, getCheckoutId } from "@framework/utils";
import { checkoutLineItemsAddMutation } from "@framework/utils/mutations";
import { useMutationHook } from "@framework/utils/use-hooks";
import useCart from "./use-cart";

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

type UseAddItem<H extends MutationHook> = ReturnType<H["useHook"]>;

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

        debugger;

        const cart = checkoutToCart(data.checkoutLineItemsAdd.checkout);
        return cart;

        debugger;
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

const useAddItem: UseAddItem<typeof handler> = () => {
    return useMutationHook({ ...handler })();
};

export default useAddItem;
