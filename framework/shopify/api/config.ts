// NOTE: Shopify configuration

import {
    SHOPIFY_CHECKOUT_ID_COOKIE,
    SHOPIFY_CUSTOMER_TOKEN_COOKIE,
} from "@framework/const";
import { ApiConfig } from "@framework/types/api";
import { fetchApi, fetchRestApi } from "@framework/utils";

class Config {
    private config: ApiConfig;

    constructor(config: ApiConfig) {
        this.config = config;
    }

    getConfig(): ApiConfig {
        return this.config;
    }
}

const configWrapper: Config = new Config({
    fetch: fetchApi,
    fetchRest: fetchRestApi,
    checkoutCookie: SHOPIFY_CHECKOUT_ID_COOKIE,
    customerTokenCookie: SHOPIFY_CUSTOMER_TOKEN_COOKIE,
});

export function getConfig(): ApiConfig {
    return configWrapper.getConfig();
}
