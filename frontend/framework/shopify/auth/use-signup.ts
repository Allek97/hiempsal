/* eslint-disable react-hooks/rules-of-hooks */
import { CustomerCreatePayload } from "@framework/schema";
import { HookDescriptor, MutationHook } from "@framework/types/hooks";
import { customerCreateMutation } from "@framework/utils/mutations";
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
    data: null;
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

        const { data, errors } = await fetch({
            ...options,
            variables,
        });

        if (errors) throw new Error(errors[0].message);

        if (
            data.customerCreate.customerUserErrors.length ||
            !data.customerCreate.customer
        )
            throw new Error(data.customerCreate.customerUserErrors[0].message);

        const login = useLogin();
        await login({ email, password });

        return null;
    },
    useHook:
        ({ fetch }) =>
        () => {
            return useCallback(async (input) => {
                const data = await fetch(input);
                return data;
            }, []);
        },
};

const useSignup: UseAddCustomer<typeof handler> = () => {
    return useMutationHook({ ...handler })();
};

export default useSignup;
