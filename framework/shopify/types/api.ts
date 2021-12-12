/* eslint-disable no-unused-vars */
export type Variables = {
    [key: string]: string | any | undefined;
};

export type ApiFetcherResults<T> = {
    data: T;
};

export type ApiFetcherOptions = {
    query: string;
    variables?: Variables;
};

export interface ApiConfig {
    fetch<T>(options: ApiFetcherOptions): Promise<ApiFetcherResults<T>>;
}
