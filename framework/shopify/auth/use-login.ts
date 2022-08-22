import { Customer } from "@framework/schema";
import { Customer as ShopifyCustomer } from "@framework/types/customer";
import { HookDescriptor, MutationHook } from "@framework/types/hooks";
import { normalizeCustomer } from "@framework/utils/normalize-customer";
import getCustomerQuery from "@framework/utils/queries/get-customer";
import { useMutationHook } from "@framework/utils/use-hooks";

interface CustomerCreateHookDescriptor extends HookDescriptor {
    fetcherInput: {
        customerAccessToken: string;
    };
    fetcherOutput: {
        customer: Customer;
    };
    data: ShopifyCustomer;
}

type UseCustomer<H extends MutationHook> = ReturnType<H["useHook"]>;

const handler: MutationHook<CustomerCreateHookDescriptor> = {
    fetcherOptions: {
        query: getCustomerQuery,
    },
    fetcher: async ({ fetch, options, input }) => {
        const { data } = await fetch({
            ...options,
            variables: input,
        });

        if (!data || !data?.customer) {
            throw Error("Customer doesn't exist");
        }

        const customer = normalizeCustomer(data.customer);

        return customer;
    },
    useHook:
        ({ fetch }) =>
        () =>
        async (input) => {
            return fetch(input);
        },
};

const useLogin: UseCustomer<typeof handler> = () => {
    return useMutationHook({ ...handler })();
};

export default useLogin;
