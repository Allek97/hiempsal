import { CustomerResetPayload } from "@framework/schema";
import { CustomerError } from "@framework/types/customer";
import { HookDescriptor, MutationHook } from "@framework/types/hooks";
import { customerResetPasswordMutation } from "@framework/utils/mutations";
import { useMutationHook } from "@framework/utils/use-hooks";

interface CustomerRecoverPasswordDescription extends HookDescriptor {
    fetcherInput: {
        id: string;
        input: {
            resetToken: string;
            password: string;
        };
    };
    fetcherOutput: {
        customerReset: CustomerResetPayload;
    };
    data: null;
}

type UseRecoverPassword<H extends MutationHook> = ReturnType<H["useHook"]>;

const handler: MutationHook<CustomerRecoverPasswordDescription> = {
    fetcherOptions: {
        query: customerResetPasswordMutation,
    },
    fetcher: async function ({
        fetch,
        options,
        input: {
            id,
            input: { resetToken, password },
        },
    }) {
        if (!(id && resetToken && password))
            throw new Error(
                "A Customer id, a reset token and a new password are required to reset the password"
            );

        const variables = {
            id: `gid://shopify/Customer/${id}`,
            input: {
                resetToken,
                password,
            },
        };

        const { data } = await fetch({
            ...options,
            variables,
        });

        if (data.customerReset.customerUserErrors) throw new Error("");

        const {
            customerReset: { customerUserErrors },
        } = data;
        if (customerUserErrors) {
            if ((customerUserErrors[0] as CustomerError).message)
                throw new Error(
                    (customerUserErrors[0] as CustomerError).message
                );
            else
                throw new Error(
                    "Server error. Please retry again in another time"
                );
        }

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
