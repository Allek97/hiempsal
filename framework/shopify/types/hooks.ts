/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { SWRResponse } from "swr";
// eslint-disable-next-line import/no-cycle
import { ApiFetcher, ApiFetcherOptions } from "./api";

export interface ApiHooks {
    cart: {
        useCart: SWRHook;
    };
}

export type HookDescriptor = {
    fetcherInput: any;
    fetcherOutput: any;
    data: any;
};

export type HookFetcherOptions = {
    query: string;
};

export type HookFetcherContext<Input, Output> = {
    input: Input;
    fetch: ApiFetcher<Output>;
    options: ApiFetcherOptions;
};

export type HookFetcherFn<Input, Output, Data> = (
    context: HookFetcherContext<Input, Output>
) => Promise<Data>;

export type UseDataContext = {
    swrOptions: any;
};

export type UseData<Data> = (context: UseDataContext) => Data;

export type SWRHookResponse<Data> = SWRResponse<Data, any> & {
    isEmpty?: boolean;
};

export type SWRHook<H extends HookDescriptor = any> = {
    fetcherOptions: HookFetcherOptions;
    fetcher: HookFetcherFn<H["fetcherInput"], H["fetcherOutput"], H["data"]>;
    useHook(context: {
        useData: UseData<SWRResponse<H["data"], any>>;
    }): () => SWRHookResponse<H["data"]>;
};

export type MutationHookContext<Input, Output> = {
    fetch: (input: Input) => Promise<Output>;
};

export type MutationHook<H extends HookDescriptor = any> = {
    fetcherOptions: HookFetcherOptions;
    fetcher: HookFetcherFn<H["fetcherInput"], H["fetcherOutput"], H["data"]>;
    useHook(
        context: MutationHookContext<H["fetcherInput"], H["data"]>
    ): () => (input: H["fetcherInput"]) => Promise<H["data"]>;
};
