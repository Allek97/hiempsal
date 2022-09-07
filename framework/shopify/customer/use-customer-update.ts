/* eslint-disable react-hooks/rules-of-hooks */
import { CustomerUpdatePayload } from "@framework/schema";

import { MutationHook } from "@framework/types/hooks";
import { setCustomerToken } from "@framework/utils";
import { customerUpdateMutation } from "@framework/utils/mutations";
import { useMutationHook } from "@framework/utils/use-hooks";
import useCustomer from "./use-customer";

type CustomerUpdate = {
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    acceptsMarketing?: boolean;
};

type AddItemHookDescriptor = {
    fetcherInput: CustomerUpdate;
    fetcherOutput: {
        customerUpdate: CustomerUpdatePayload;
    };
    data: null;
};

type UseCustomerUpdate<H extends MutationHook> = ReturnType<H["useHook"]>;

const handler: MutationHook<AddItemHookDescriptor> = {
    fetcherOptions: {
        query: customerUpdateMutation,
    },

    fetcher: async ({ fetch, options, input }) => {
        const { data, errors } = await fetch({
            ...options,
            variables: { ...input },
        });

        if (errors) throw new Error(errors[0].message);
        const { customerUpdate } = data;
        if (customerUpdate?.customerUserErrors.length)
            throw new Error(
                "Missing fields or server error, please try again later"
            );

        if (customerUpdate.customerAccessToken)
            setCustomerToken(
                customerUpdate.customerAccessToken.accessToken,
                customerUpdate.customerAccessToken.expiresAt
            );

        return null;
    },
    useHook:
        ({ fetch }) =>
        () => {
            const { data: customer, mutate: updateCustomer } = useCustomer();
            return async (input) => {
                const response = await fetch(input);
                await updateCustomer({ ...customer!, ...input }, false);
                return response;
            };
        },
};

const useCustomerUpdate: UseCustomerUpdate<typeof handler> = () => {
    return useMutationHook({ ...handler })();
};

export default useCustomerUpdate;
