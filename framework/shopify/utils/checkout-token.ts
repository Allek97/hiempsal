import Cookies, { CookieAttributes } from "js-cookie";
import {
    SHOPIFY_CHECKOUT_ID_COOKIE,
    SHOPIFY_CHECKOUT_URL_COOKIE,
    SHOPIFY_COOKIE_EXPIRE,
} from "@framework/const";

export const getCheckoutIdToken = () => Cookies.get(SHOPIFY_CHECKOUT_ID_COOKIE);
export const getCheckoutUrlToken = () =>
    Cookies.get(SHOPIFY_CHECKOUT_URL_COOKIE);

export const removeCheckoutTokens = () => {
    Cookies.remove(SHOPIFY_CHECKOUT_ID_COOKIE);
    Cookies.remove(SHOPIFY_CHECKOUT_URL_COOKIE);
};

export const setCustomerToken = ({
    checkoutId,
    checkoutUrl,
    options,
}: {
    checkoutId?: string;
    checkoutUrl?: string;
    options?: CookieAttributes;
}) => {
    if (checkoutId)
        Cookies.set(
            SHOPIFY_CHECKOUT_ID_COOKIE,
            checkoutId,
            options ?? { expires: SHOPIFY_COOKIE_EXPIRE }
        );
    if (checkoutUrl)
        Cookies.set(
            SHOPIFY_CHECKOUT_URL_COOKIE,
            checkoutUrl,
            options ?? { expires: SHOPIFY_COOKIE_EXPIRE }
        );
};
