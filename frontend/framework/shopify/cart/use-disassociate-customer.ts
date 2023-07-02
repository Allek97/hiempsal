/* eslint-disable react-hooks/rules-of-hooks */
import { CheckoutCustomerDisassociateV2Payload } from "@framework/schema";
import { MutationHook } from "@framework/types/hooks";
import { checkoutCustomerDisassociateMutation } from "@framework/utils/mutations";
import { useMutationHook } from "@framework/utils/use-hooks";

type AddItemHookDescriptor = {
    fetcherInput: {
        checkoutId: string | undefined;
    };
    fetcherOutput: {
        checkoutCustomerDisassociateV2: CheckoutCustomerDisassociateV2Payload;
    };
    data: null;
};

type UseDisassociateCustomer<H extends MutationHook> = ReturnType<H["useHook"]>;

const handler: MutationHook<AddItemHookDescriptor> = {
    fetcherOptions: {
        query: checkoutCustomerDisassociateMutation,
    },

    fetcher: async ({ fetch, options, input: { checkoutId } }) => {
        if (!checkoutId) return null;

        const variables = {
            checkoutId,
        };

        const { data } = await fetch({
            ...options,
            variables,
        });

        const {
            checkoutCustomerDisassociateV2: { checkoutUserErrors },
        } = data;
        if (checkoutUserErrors.length)
            throw new Error(
                checkoutUserErrors[0]?.message ||
                    "Server error. Can't disassociate customer to the checkout, please try again another time!"
            );

        return null;
    },
    useHook:
        ({ fetch }) =>
        () => {
            return async (input) => {
                const response = await fetch(input);
                return response;
            };
        },
};

const useDisassociateCustomer: UseDisassociateCustomer<typeof handler> = () => {
    return useMutationHook({ ...handler })();
};

export default useDisassociateCustomer;
