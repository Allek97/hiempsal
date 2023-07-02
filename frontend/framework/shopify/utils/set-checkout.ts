import Cookies, { CookieAttributes } from "js-cookie";

import {
    SHOPIFY_CHECKOUT_ID_COOKIE,
    SHOPIFY_CHECKOUT_URL_COOKIE,
    SHOPIFY_COOKIE_EXPIRE,
} from "@framework/const";

type CheckoutType = {
    checkoutId: string;
    checkoutUrl: string;
};

const setCheckout = ({ checkoutId, checkoutUrl }: CheckoutType): void => {
    const options: CookieAttributes = {
        expires: SHOPIFY_COOKIE_EXPIRE,
    };

    Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE, checkoutId);
    Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE, checkoutUrl, options);
};

export default setCheckout;
