import { Checkout, Maybe } from "@framework/schema";
import { Cart } from "@framework/types/cart";
import { normalizeCart } from ".";

const checkoutToCart = (checkout: Maybe<Checkout | undefined>): Cart => {
    if (!checkout) {
        throw new Error("Missing checkout object!");
    }

    return normalizeCart(checkout);
};

export default checkoutToCart;
