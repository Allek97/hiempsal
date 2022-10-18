import faker from "@faker-js/faker";
import { SHOPIFY_COOKIE_EXPIRE } from "@framework/const";
import { CustomerAccessTokenCreatePayload } from "@framework/schema";
import { graphql } from "msw";
import { shopifyCustomerMock } from "../utils/mockCustomer";

const accessToken: string = faker.datatype.uuid();

export const authHandlers = [
    graphql.mutation("customerAccessTokenCreate", (req, res, ctx) => {
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
