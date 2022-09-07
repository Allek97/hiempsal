/* eslint-disable react-hooks/rules-of-hooks */
import { CustomerAddressUpdatePayload } from "@framework/schema";

import { MutationHook } from "@framework/types/hooks";
import { customerUpdateAddressMutation } from "@framework/utils/mutations";

import { useMutationHook } from "@framework/utils/use-hooks";
import useCustomer from "./use-customer";

type CustomerUpdate = {
    address: {
        address1?: string;
        city?: string;
        company?: string;
        country?: string;
        zip?: string;
    };
    customerAccessToken: string;
    id: string;
};

type AddItemHookDescriptor = {
    fetcherInput: CustomerUpdate;
    fetcherOutput: {
        customerAddressUpdate: CustomerAddressUpdatePayload;
    };
    data: null;
};

type UseCustomerUpdateAddress<H extends MutationHook> = ReturnType<
    H["useHook"]
>;

const handler: MutationHook<AddItemHookDescriptor> = {
    fetcherOptions: {
        query: customerUpdateAddressMutation,
    },

    fetcher: async ({ fetch, options, input }) => {
        const { data, errors } = await fetch({
            ...options,
            variables: { ...input },
        });

        if (errors) throw new Error(errors[0].message);
        const { customerAddressUpdate } = data;
        if (customerAddressUpdate?.customerUserErrors.length)
            throw new Error(
                "Missing fields or server error, please try again later"
            );

        return null;
    },
    useHook:
        ({ fetch }) =>
        () => {
            const { mutate: updateCustomer } = useCustomer();
            return async (input) => {
                const response = await fetch(input);
                updateCustomer();
                return response;
            };
        },
};

const useCustomerUpdateAddress: UseCustomerUpdateAddress<
    typeof handler
> = () => {
    return useMutationHook({ ...handler })();
};

export default useCustomerUpdateAddress;
