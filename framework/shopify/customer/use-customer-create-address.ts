/* eslint-disable react-hooks/rules-of-hooks */
import { CustomerAddressCreatePayload } from "@framework/schema";

import { MutationHook } from "@framework/types/hooks";
import { customerCreateAddressMutation } from "@framework/utils/mutations";
import { useMutationHook } from "@framework/utils/use-hooks";

export type CustomerAddressCreate = {
    address: {
        address1?: string;
        city?: string;
        company?: string;
        country?: string;
        zip?: string;
    };
    customerAccessToken: string;
};

type AddItemHookDescriptor = {
    fetcherInput: CustomerAddressCreate;
    fetcherOutput: {
        customerAddressCreate: CustomerAddressCreatePayload;
    };
    data: {
        addressId: string;
    };
};

type UseCustomerCreateAddress<H extends MutationHook> = ReturnType<
    H["useHook"]
>;

const handler: MutationHook<AddItemHookDescriptor> = {
    fetcherOptions: {
        query: customerCreateAddressMutation,
    },

    fetcher: async ({ fetch, options, input }) => {
        const { data, errors } = await fetch({
            ...options,
            variables: { ...input },
        });

        if (errors) throw new Error(errors[0].message);
        const { customerAddressCreate } = data;
        if (
            customerAddressCreate?.customerUserErrors.length ||
            !customerAddressCreate.customerAddress
        )
            throw new Error(
                customerAddressCreate.customerUserErrors[0].message
            );

        return { addressId: customerAddressCreate.customerAddress.id };
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

const useCustomerCreateAddress: UseCustomerCreateAddress<
    typeof handler
> = () => {
    return useMutationHook({ ...handler })();
};

export default useCustomerCreateAddress;
