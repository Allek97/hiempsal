import { CustomerResetPayload } from "@framework/schema";
import { CustomerError } from "@framework/types/customer";
import { HookDescriptor, MutationHook } from "@framework/types/hooks";
import { removeCustomerToken } from "@framework/utils/customer-token";
import { customerResetPasswordMutation } from "@framework/utils/mutations";
import { useMutationHook } from "@framework/utils/use-hooks";

export type ResetPasswordInput = {
    id: string;
    input: {
        resetToken: string;
        password: string;
    };
};

interface CustomerResetPasswordDescription extends HookDescriptor {
    fetcherInput: ResetPasswordInput;
    fetcherOutput: {
        customerReset: CustomerResetPayload;
    };
    data: null;
}

type UseResetPassword<H extends MutationHook> = ReturnType<H["useHook"]>;

const handler: MutationHook<CustomerResetPasswordDescription> = {
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

        const variables: ResetPasswordInput = {
            id,
            input: {
                resetToken,
                password,
            },
        };

        const { data } = await fetch({
            ...options,
            variables,
        });

        if (data.customerReset.customerUserErrors.length) throw new Error("");

        const {
            customerReset: { customerUserErrors },
        } = data;
        if (customerUserErrors.length) {
            if ((customerUserErrors[0] as CustomerError).message)
                throw new Error(
                    (customerUserErrors[0] as CustomerError).message
                );
            else
                throw new Error(
                    "Server error. Please retry again in another time"
                );
        }

        removeCustomerToken();
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

const useResetPassword: UseResetPassword<typeof handler> = () => {
    return useMutationHook(handler)();
};

export default useResetPassword;
