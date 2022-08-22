/* eslint-disable react-hooks/rules-of-hooks */
import { Customer as ShopifyCustomer } from "@framework/schema";
import { Customer } from "@framework/types/customer";
import { HookDescriptor, SWRHook } from "@framework/types/hooks";
import { getCustomerToken } from "@framework/utils";
import { normalizeCustomer } from "@framework/utils/normalize-customer";
import getCustomerQuery from "@framework/utils/queries/get-customer";
import { useSWRHook } from "@framework/utils/use-hooks";
import { useMemo } from "react";

interface CustomerCreateHookDescriptor extends HookDescriptor {
    fetcherOutput: {
        customer: ShopifyCustomer;
    };
    data: Customer | null;
}

type UseCustomer<H extends SWRHook> = ReturnType<H["useHook"]>;

const handler: SWRHook<CustomerCreateHookDescriptor> = {
    fetcherOptions: {
        query: getCustomerQuery,
    },
    fetcher: async ({ fetch, options }) => {
        const customerAccessToken = getCustomerToken();
        if (customerAccessToken) {
            const { data } = await fetch({
                ...options,
                variables: {
                    customerAccessToken: getCustomerToken(),
                },
            });

            if (!data || !data?.customer) {
                throw Error("Customer doesn't exist");
            }

            const customer = normalizeCustomer(data.customer);

            return customer;
        }

        return null;
    },
    useHook:
        ({ useData }) =>
        () => {
            const result = useData({
                swrOptions: {
                    revalidateOnFocus: false,
                },
            });

            return useMemo(() => {
                return result;
            }, [result]);
        },
};

const useCustomer: UseCustomer<typeof handler> = () => {
    return useSWRHook({ ...handler })();
};

export default useCustomer;
