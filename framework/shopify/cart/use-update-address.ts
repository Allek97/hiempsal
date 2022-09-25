/* eslint-disable react-hooks/rules-of-hooks */
import { CheckoutShippingAddressUpdateV2Payload } from "@framework/schema";
import { Address } from "@framework/types/address";
import { Cart } from "@framework/types/cart";
import { MutationHook } from "@framework/types/hooks";
import { checkoutToCart } from "@framework/utils";
import { checkoutUpdateAddressMutation } from "@framework/utils/mutations";
import { useMutationHook } from "@framework/utils/use-hooks";
import useCart from "./use-cart";

type AddItemHookDescriptor = {
    fetcherInput: {
        checkoutId?: string;
        shippingAddress: Partial<Address>;
    };
    fetcherOutput: {
        checkoutShippingAddressUpdateV2: CheckoutShippingAddressUpdateV2Payload;
    };
    data: Cart;
};

type UseUpdateCartAddress<H extends MutationHook> = ReturnType<H["useHook"]>;

const handler: MutationHook<AddItemHookDescriptor> = {
    fetcherOptions: {
        query: checkoutUpdateAddressMutation,
    },

    fetcher: async ({
        fetch,
        options,
        input: { checkoutId, shippingAddress },
    }) => {
        const variables = {
            checkoutId,
            shippingAddress,
        };

        const { data } = await fetch({
            ...options,
            variables,
        });

        const cart = checkoutToCart(
            data.checkoutShippingAddressUpdateV2.checkout
        );

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

const useUpdateCartAddress: UseUpdateCartAddress<typeof handler> = () => {
    return useMutationHook({ ...handler })();
};

export default useUpdateCartAddress;
