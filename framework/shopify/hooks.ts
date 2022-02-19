import { handler as useCart } from "./cart/use-cart";
import { ApiHooks } from "./types/hooks";

export const shopifyHooks: ApiHooks = {
    cart: {
        useCart,
    },
};
