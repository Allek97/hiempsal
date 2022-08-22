import { CustomerCreatePayload } from "@framework/schema";
import { Customer } from "@framework/types/customer";
import { HookDescriptor, MutationHook } from "@framework/types/hooks";
import { customerCreateMutation } from "@framework/utils/mutations";
import { normalizeCustomer } from "@framework/utils/normalize-customer";
import { useMutationHook } from "@framework/utils/use-hooks";

interface CustomerCreateHookDescriptor extends HookDescriptor {
    fetcherInput: {
        email: string;
        password: string;
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
    fetcher: async ({ fetch, options, input: { email, password } }) => {
        const variables = {
            input: {
                email: email,
                password: password,
            },
        };

        const { data } = await fetch({
            ...options,
            variables,
        });

        if (!data || !data.customerCreate?.customer) {
            throw new Error("Customer cannot be created, please retry again !");
        }

        if (data.customerCreate.customerUserErrors.length) {
            throw new Error("Email has already been taken");
        }

        const customer = normalizeCustomer(data.customerCreate.customer);

        return customer;
    },
    useHook:
        ({ fetch }) =>
        () =>
        async (input) => {
            return fetch(input);
        },
};

const useSignup: UseAddCustomer<typeof handler> = () => {
    return useMutationHook({ ...handler })();
};

export default useSignup;
