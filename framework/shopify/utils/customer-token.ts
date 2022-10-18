import Cookies, { CookieAttributes } from "js-cookie";
import {
    SHOPIFY_COOKIE_EXPIRE,
    SHOPIFY_CUSTOMER_TOKEN_COOKIE,
} from "@framework/const";

export const getCustomerToken = () =>
    Cookies.get(SHOPIFY_CUSTOMER_TOKEN_COOKIE);

export const removeCustomerToken = () =>
    Cookies.remove(SHOPIFY_CUSTOMER_TOKEN_COOKIE);

export const setCustomerToken = (
    token: string,
    { expires, ...options }: CookieAttributes = {}
) => {
    Cookies.set(SHOPIFY_CUSTOMER_TOKEN_COOKIE, token, {
        ...options,
        expires: expires ?? SHOPIFY_COOKIE_EXPIRE,
    });
};
