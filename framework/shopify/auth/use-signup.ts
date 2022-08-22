/* eslint-disable react-hooks/rules-of-hooks */
import useCustomer from "@framework/customer/use-customer";
import { CustomerCreatePayload } from "@framework/schema";
import { Customer } from "@framework/types/customer";
import { HookDescriptor, MutationHook } from "@framework/types/hooks";
import { customerCreateMutation } from "@framework/utils/mutations";
import { normalizeCustomer } from "@framework/utils/normalize-customer";
import { useMutationHook } from "@framework/utils/use-hooks";
import { useCallback } from "react";
import useLogin from "./use-login";

interface CustomerCreateHookDescriptor extends HookDescriptor {
    fetcherInput: {
        firstName: string;
        email: string;
        password: string;
        phone: string;
    };
    fetcherOutput: {
        customerCreate: CustomerCreatePayload;
    };
    data: Customer;
}

type UseAddCustomer<H extends MutationHook> = ReturnType<H["useHook"]>;

const handler: MutationHook<CustomerCreateHookDescriptor> = {
    fetcherOptions: {
        query: customerCreateMutation,
    },
    fetcher: async ({
        fetch,
        options,
        input: { email, password, firstName, phone },
    }) => {
        if (!(email && password && firstName && phone)) {
            throw new Error(
                "You need to prtovide email,password,firstname and phone in order to signup"
            );
        }
        const variables = {
            input: {
                email,
                password,
                firstName,
                phone,
            },
        };

        const { data } = await fetch({
            ...options,
            variables,
        });

        if (data.customerCreate.customerUserErrors)
            throw new Error("Email has already been taken");

        if (!data || !data.customerCreate?.customer)
            throw new Error(
                "Limit exceeded. Customer cannot be created, please retry again !"
            );

        const login = useLogin();
        await login({ email, password });

        const customer = normalizeCustomer(data.customerCreate.customer);

        return customer;
    },
    useHook:
        ({ fetch }) =>
        () => {
            const { mutate } = useCustomer();
            return useCallback(
                async (input) => {
                    const data = await fetch(input);
                    mutate(data, false);
                    return data;
                },
                [mutate]
            );
        },
};

const useSignup: UseAddCustomer<typeof handler> = () => {
    return useMutationHook({ ...handler })();
};

export default useSignup;
