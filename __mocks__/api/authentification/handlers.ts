import faker from "@faker-js/faker";
import { SHOPIFY_COOKIE_EXPIRE } from "@framework/const";
import { CustomerAccessTokenCreatePayload } from "@framework/schema";
import { graphql } from "msw";
import { shopifyCustomerMock } from "../utils/mockCustomer";

const accessToken: string = faker.datatype.uuid();

export const authHandlers = [
    graphql.mutation("customerAccessTokenCreate", (req, res, ctx) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { input } = req.body!.variables;
        if (input.email.includes("server-error")) {
            return res(
                ctx.errors([
                    {
                        message: "Network error, muration failed to fetch",
                        locations: [
                            {
                                line: 8,
                                column: 12,
                            },
                        ],
                    },
                ])
            );
        }
        if (input.email.includes("unregistered-customer")) {
            return res(
                ctx.data({
                    customerAccessTokenCreate: {
                        customerUserErrors: [
                            {
                                message: "shopify error",
                            },
                        ],
                        userErrors: [],
                        customerAccessToken: {
                            accessToken,
                            expiresAt: SHOPIFY_COOKIE_EXPIRE,
                        },
                    } as CustomerAccessTokenCreatePayload,
                })
            );
        }
        return res(
            ctx.data({
                customerAccessTokenCreate: {
                    customerUserErrors: [],
                    userErrors: [],
                    customerAccessToken: {
                        accessToken,
                        expiresAt: SHOPIFY_COOKIE_EXPIRE,
                    },
                } as CustomerAccessTokenCreatePayload,
            })
        );
    }),

    graphql.query("getCustomer", (req, res, ctx) => {
        return res(
            ctx.data({
                customer: shopifyCustomerMock,
            })
        );
    }),
];
