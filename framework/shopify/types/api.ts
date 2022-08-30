// eslint-disable-next-line import/no-cycle
import { ApiHooks } from "./hooks";

/* eslint-disable no-unused-vars */
export type Variables = {
    [key: string]: string | any | undefined;
};

export type Body = {
    [key: string | number]: number | string | object | any;
};

export type ApiFetcherResults<T> = {
    data: T;
    status?: string;
    errors?: any;
};

export type ApiFetcherOptions = {
    query: string;
    variables?: Variables;
};
export type ApiFetcherOptionsRest = {
    url: string;
    body?: Body;
};
export type ApiFetcher<T = any> = (
    options: ApiFetcherOptions
) => Promise<ApiFetcherResults<T>>;

export interface ApiConfig {
    fetch<T>(options: ApiFetcherOptions): Promise<ApiFetcherResults<T>>;
    fetchRest<T>(options: ApiFetcherOptionsRest): Promise<ApiFetcherResults<T>>;
    checkoutCookie: string;
    customerTokenCookie: string;
}

export interface ApiProviderContext {
    hooks: ApiHooks;
    fetcher: ApiFetcher;
    checkoutCookie: string;
}
