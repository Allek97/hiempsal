/* eslint-disable react-hooks/rules-of-hooks */
import { CustomerDefaultAddressUpdatePayload } from "@framework/schema";
import { Address } from "@framework/types/address";

import { MutationHook } from "@framework/types/hooks";
import { customerUpdateDefaultAddressMutation } from "@framework/utils/mutations";
import { normalizeAddress } from "@framework/utils/normalize-customer";
import { useMutationHook } from "@framework/utils/use-hooks";
import useCustomer from "./use-customer";

type CustomerUpdate = {
    addressId: string;
    customerAccessToken: string;
};

type AddItemHookDescriptor = {
    fetcherInput: CustomerUpdate;
    fetcherOutput: {
        customerDefaultAddressUpdate: CustomerDefaultAddressUpdatePayload;
    };
    data: {
        defaultAddress: Address;
    };
};

type UseCustomerUpdateDefaultAddress<H extends MutationHook> = ReturnType<
    H["useHook"]
>;

const handler: MutationHook<AddItemHookDescriptor> = {
    fetcherOptions: {
        query: customerUpdateDefaultAddressMutation,
    },

    fetcher: async ({ fetch, options, input }) => {
        const { data, errors } = await fetch({
            ...options,
            variables: { ...input },
        });

        if (errors) throw new Error(errors[0].message);
        const { customerDefaultAddressUpdate } = data;
        if (
            customerDefaultAddressUpdate?.customerUserErrors.length ||
            !customerDefaultAddressUpdate.customer ||
            !customerDefaultAddressUpdate.customer.defaultAddress
        )
            throw new Error(
                customerDefaultAddressUpdate.customerUserErrors[0].message
            );

        return {
            defaultAddress: normalizeAddress(
                customerDefaultAddressUpdate.customer.defaultAddress
            ),
        };
    },
    useHook:
        ({ fetch }) =>
        () => {
            const { data: customer, mutate: updateCustomer } = useCustomer();
            return async (input) => {
                const response = await fetch(input);
                customer!.defaultAddress = response.defaultAddress;
                updateCustomer(customer!, false);
                return response;
            };
        },
};

const useCustomerUpdateDefaultAddress: UseCustomerUpdateDefaultAddress<
    typeof handler
> = () => {
    return useMutationHook({ ...handler })();
};

export default useCustomerUpdateDefaultAddress;
