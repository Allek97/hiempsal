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

        const { data, errors } = await fetch({
            ...options,
            variables: {
                email,
            },
        });

        if (errors) throw new Error(errors[0].message);

        const { customerRecover } = data;
        if (customerRecover.customerUserErrors.length)
            throw new Error(
                "This email is not associated to any of our customers."
            );

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
