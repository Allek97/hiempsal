import { CustomerRecoverPayload } from "@framework/schema";
import { HookDescriptor, MutationHook } from "@framework/types/hooks";
import { customerRecoverPasswordMutation } from "@framework/utils/mutations";
import { useMutationHook } from "@framework/utils/use-hooks";

interface CustomerRecoverPasswordDescription extends HookDescriptor {
    fetcherInput: {
        email: string;
    };
    fetcherOutput: {
        customerRecover: CustomerRecoverPayload;
    };
    data: null;
}

type UseRecoverPassword<H extends MutationHook> = ReturnType<H["useHook"]>;

const handler: MutationHook<CustomerRecoverPasswordDescription> = {
    fetcherOptions: {
        query: customerRecoverPasswordMutation,
    },
    fetcher: async function ({ fetch, options, input: { email } }) {
        if (!email)
            throw new Error(
                "Email is required for your first step in the reset password process"
            );

        const { data } = await fetch({
            ...options,
            variables: {
                email,
            },
        });

        const { customerRecover } = data;
        if (customerRecover.customerUserErrors)
            throw new Error("Could not find customer in our database");

        return null;
    },
    useHook:
        ({ fetch }) =>
        () => {
            return async function (input) {
                const data = await fetch(input);
                return data;
            };
        },
};

const useRecoverPassword: UseRecoverPassword<typeof handler> = () => {
    return useMutationHook(handler)();
};

export default useRecoverPassword;
