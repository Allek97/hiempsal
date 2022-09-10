import Cookies, { CookieAttributes } from "js-cookie";
import {
    SHOPIFY_COOKIE_EXPIRE,
    SHOPIFY_WISHLIST_TOKEN_COOKIE,
} from "@framework/const";

export const getWishlistToken = () =>
    Cookies.get(SHOPIFY_WISHLIST_TOKEN_COOKIE);

export const removeWishlistToken = () =>
    Cookies.remove(SHOPIFY_WISHLIST_TOKEN_COOKIE);

export const setWishlistToken = (token: string, options?: CookieAttributes) => {
    Cookies.set(
        SHOPIFY_WISHLIST_TOKEN_COOKIE,
        token,
        options ?? { expires: SHOPIFY_COOKIE_EXPIRE }
    );
};
