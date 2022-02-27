import { getConfig } from "@framework/api/config";
import { ApiFetcher } from "@framework/types/api";
import useSWR from "swr";

const useData = (hook: any, fetcher: ApiFetcher, ctx: any) => {
    const hookFetcher = async (query: string) => {
        // eslint-disable-next-line no-useless-catch
        try {
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

export const useSWRHook = (hook: any) => {
    const { fetch: fetcher } = getConfig();
    return hook.useHook({
        useData(ctx: any) {
            const data = useData(hook, fetcher, ctx);
            return data;
        },
    });
};

export const useMutationHook = (hook: any) => {
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
