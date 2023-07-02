import {
    SHOPIFY_CHECKOUT_ID_COOKIE,
    SHOPIFY_CHECKOUT_URL_COOKIE,
} from "@framework/const";
import { LineItem } from "@framework/types/cart";
import { graphql } from "msw";

// type Variables = {
//     checkoutId: string,
//     lineItems: [CheckoutLineItemInput!]!,
// }
const checkoutId = "abcdef123";
const checkoutUrl = "shopify.com";

export const checkoutHandlers = [
    // Handles a "checkoutCreate" mutation
    graphql.mutation("checkoutCreate", (req, res, ctx) => {
        return res(
            ctx.cookie(SHOPIFY_CHECKOUT_URL_COOKIE, checkoutUrl),
            ctx.cookie(SHOPIFY_CHECKOUT_ID_COOKIE, checkoutId),
            ctx.data({
                checkoutCreate: {
                    checkout: {
                        id: checkoutId,
                        webUrl: checkoutUrl,
                        lineItems: [],
                    },
                },
            })
        );
    }),
    // Handles a "getCheckout" query
    graphql.query("getCheckout", (req, res, ctx) => {
        return res(
            ctx.data({
                checkoutCreate: {
                    checkout: {
                        checkoutId,
                        checkoutUrl,
                    },
                },
            })
        );
    }),
    // Handles a "checkoutLineItemsAdd" mutation
    graphql.mutation("checkoutLineItemsAdd", (req, res, ctx) => {
        const { lineItems } = req.variables;
        const {
            SHOPIFY_CHECKOUT_ID_COOKIE: checkoutIdCookie,
            SHOPIFY_CHECKOUT_URL_COOKIE: checkoutUrlCookie,
        } = req.cookies;

        return res(
            ctx.data({
                checkoutLineItemsAdd: {
                    checkout: {
                        checkoutId: checkoutIdCookie,
                        checkoutUrl: checkoutUrlCookie,
                        lineItems: (lineItems as LineItem[]).map(
                            (lineItem: LineItem) => lineItem
                        ),
                    },
                },
            })
        );
    }),
];
