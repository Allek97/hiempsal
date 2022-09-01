/* eslint-disable react-hooks/rules-of-hooks */
import useCart from "@framework/cart/use-cart";
import useCustomer from "@framework/customer/use-customer";
import { CustomerAccessTokenDeletePayload } from "@framework/schema";

import { HookDescriptor, MutationHook } from "@framework/types/hooks";
import { removeCheckoutTokens } from "@framework/utils/checkout-token";

import {
    removeCustomerToken,
    getCustomerToken,
} from "@framework/utils/customer-token";
import { customerDeleteAccessTokenMutation } from "@framework/utils/mutations";

import { useMutationHook } from "@framework/utils/use-hooks";
import { useCallback } from "react";

interface CustomerCreateHookDescriptor extends HookDescriptor {
    fetcherOutput: {
        customerAccessTokenDelete: CustomerAccessTokenDeletePayload;
    };
    data: null;
}

type UseLogout<H extends MutationHook> = ReturnType<H["useHook"]>;

const handler: MutationHook<CustomerCreateHookDescriptor> = {
    fetcherOptions: {
        query: customerDeleteAccessTokenMutation,
    },
    fetcher: async ({ fetch, options }) => {
        const { data, errors } = await fetch({
            ...options,
            variables: {
                customerAccessToken: getCustomerToken(),
            },
        });

        if (errors) throw new Error(errors[0].message);

        const { customerAccessTokenDelete } = data;
        if (customerAccessTokenDelete?.userErrors.length)
            throw new Error(customerAccessTokenDelete.userErrors[0].message);

        if (!customerAccessTokenDelete)
            throw new Error(
                "Customer access token provided is wrong or you don't have the authorization to make this request"
            );

        removeCustomerToken();
        removeCheckoutTokens();

        return null;
    },
    useHook:
        ({ fetch }) =>
        () => {
            const { mutate: mutateUser } = useCustomer();
            const { mutate: mutateCart } = useCart();

            return useCallback(async () => {
                const data = await fetch();
                await mutateUser(null, false);
                await mutateCart(undefined, false);
                return data;
            }, [mutateCart, mutateUser]);
        },
};

const useLogout: UseLogout<typeof handler> = () => {
    return useMutationHook({ ...handler })();
};

export default useLogout;
