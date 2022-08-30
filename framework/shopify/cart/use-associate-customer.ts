/* eslint-disable react-hooks/rules-of-hooks */
import { CheckoutCustomerAssociateV2Payload } from "@framework/schema";
import { MutationHook } from "@framework/types/hooks";
import { checkoutCustomerAssociateMutation } from "@framework/utils/mutations";
import { useMutationHook } from "@framework/utils/use-hooks";

type AddItemHookDescriptor = {
    fetcherInput: {
        checkoutId: string | undefined;
        customerAccessToken: string | undefined;
    };
    fetcherOutput: {
        checkoutCustomerAssociateV2: CheckoutCustomerAssociateV2Payload;
    };
    data: null;
};

type UseAssociateCustomer<H extends MutationHook> = ReturnType<H["useHook"]>;

const handler: MutationHook<AddItemHookDescriptor> = {
    fetcherOptions: {
        query: checkoutCustomerAssociateMutation,
    },

    fetcher: async ({
        fetch,
        options,
        input: { checkoutId, customerAccessToken },
    }) => {
        if (!customerAccessToken || !checkoutId) return null;

        const variables = {
            checkoutId,
            customerAccessToken,
        };

        const { data } = await fetch({
            ...options,
            variables,
        });

        const {
            checkoutCustomerAssociateV2: { checkoutUserErrors },
        } = data;
        if (checkoutUserErrors.length)
            throw new Error(
                checkoutUserErrors[0]?.message ||
                    "Server error. Can't associate customer to the checkout, please try again another time"
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

const useAssociateCustomer: UseAssociateCustomer<typeof handler> = () => {
    return useMutationHook({ ...handler })();
};

export default useAssociateCustomer;
