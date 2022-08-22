/* eslint-disable react-hooks/rules-of-hooks */
import { CustomerAccessTokenCreatePayload } from "@framework/schema";

import { HookDescriptor, MutationHook } from "@framework/types/hooks";
import { setCustomerToken } from "@framework/utils";
import customerCreateAccessTokenMutation from "@framework/utils/mutations/customer-create-access-token";

import { useMutationHook } from "@framework/utils/use-hooks";

interface CustomerCreateHookDescriptor extends HookDescriptor {
    fetcherInput: {
        email: string;
        password: string;
    };
    fetcherOutput: {
        customerAccessTokenCreate: CustomerAccessTokenCreatePayload;
    };
    data: null;
}

type UseLogin<H extends MutationHook> = ReturnType<H["useHook"]>;

const handler: MutationHook<CustomerCreateHookDescriptor> = {
    fetcherOptions: {
        query: customerCreateAccessTokenMutation,
    },
    fetcher: async ({ fetch, options, input: { email, password } }) => {
        if (!(email && password)) {
            throw new Error("An email and password are required to login");
        }
        const { data } = await fetch({
            ...options,
            variables: {
                input: {
                    email,
                    password,
                },
            },
        });

        const { customerAccessTokenCreate } = data;

        if (customerAccessTokenCreate?.customerUserErrors)
            throw new Error("Unidentified customer. Wrong email or password !");

        const { customerAccessToken } = customerAccessTokenCreate;
        const accessToken = customerAccessToken?.accessToken;

        if (accessToken)
            setCustomerToken(accessToken, customerAccessToken.expiresAt);

        return null;
    },
    useHook:
        ({ fetch }) =>
        () => {
            return async (input) => {
                const data = await fetch(input);
                return data;
            };
        },
};

const useLogin: UseLogin<typeof handler> = () => {
    return useMutationHook({ ...handler })();
};

export default useLogin;
