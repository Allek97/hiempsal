import Cookies, { CookieAttributes } from "js-cookie";

import {
    SHOPIFY_CHECKOUT_ID_COOKIE,
    SHOPIFY_CHECKOUT_URL_COOKIE,
    SHOPIFY_COOKIE_EXPIRE,
} from "@framework/const";

import { Checkout, CheckoutCreatePayload } from "@framework/schema";

import { ApiFetcher } from "@framework/types/api";

import { checkoutCreateMutation } from "./mutations";

const createCheckout = async (
    fetch: ApiFetcher<{ checkoutCreate: CheckoutCreatePayload }>
): Promise<Checkout> => {
    const { data } = await fetch({ query: checkoutCreateMutation });

    const { checkout } = data.checkoutCreate;

    if (!checkout) {
        throw new Error("Checkout cannot be created !");
    }

    const checkoutId = checkout?.id;

    if (checkoutId) {
        const options: CookieAttributes = {
            expires: SHOPIFY_COOKIE_EXPIRE,
        };

        Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE, checkoutId);
        Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE, checkout?.webUrl, options);
    }

    return checkout;
};

export default createCheckout;
