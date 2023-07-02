import { getConfig } from "@framework/api/config";
import { ApiFetcher } from "@framework/types/api";
import { MutationHook, SWRHook } from "@framework/types/hooks";
import useSWR from "swr";

const useData = (hook: SWRHook, fetcher: ApiFetcher, ctx: any) => {
    const hookFetcher = async (query: string) => {
        // eslint-disable-next-line no-useless-catch
        try {
            // eslint-disable-next-line @typescript-eslint/return-await
            return await hook.fetcher({
                fetch: fetcher,
                options: { query },
                input: {},
            });
        } catch (error) {
            throw error;
        }
    };

    const response = useSWR(hook.fetcherOptions.query, hookFetcher, ctx);

    return response;
};

export const useSWRHook = (hook: SWRHook) => {
    const { fetch: fetcher } = getConfig();
    return hook.useHook({
        useData(ctx: any) {
            const data = useData(hook, fetcher, ctx);
            return data;
        },
    });
};

export const useMutationHook = (hook: MutationHook) => {
    const { fetch: fetcher } = getConfig();
    return hook.useHook({
        fetch: (input: any) => {
            return hook.fetcher({
                fetch: fetcher,
                options: hook.fetcherOptions,
                input,
            });
        },
    });
};
