import Cookies, { CookieAttributes } from "js-cookie";
import {
    SHOPIFY_COOKIE_EXPIRE,
    SHOPIFY_VIEWED_TOKEN_COOKIE,
} from "@framework/const";

export const getViewedToken = () => Cookies.get(SHOPIFY_VIEWED_TOKEN_COOKIE);

export const removeViewedToken = () =>
    Cookies.remove(SHOPIFY_VIEWED_TOKEN_COOKIE);

export const setViewedToken = (token: string, options?: CookieAttributes) => {
    Cookies.set(
        SHOPIFY_VIEWED_TOKEN_COOKIE,
        token,
        options ?? { expires: SHOPIFY_COOKIE_EXPIRE }
    );
};
