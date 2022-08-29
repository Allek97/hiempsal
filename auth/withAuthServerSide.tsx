import { getConfig } from "@framework/api/config";
import { SHOPIFY_CUSTOMER_TOKEN_COOKIE } from "@framework/const";
import getCustomer from "@framework/customer/get-customer";
import { getCustomerQuery } from "@framework/utils";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

export function withAuthServerSideProps({ redirecTo = "/authentification" }) {
    return async (
        context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
    ) => {
        const config = getConfig();
        const customerAccessToken: string | undefined =
            context.req.cookies[SHOPIFY_CUSTOMER_TOKEN_COOKIE];
        const customer = await getCustomer({ config, customerAccessToken });

        if (!customer) {
            return {
                redirect: {
                    destination: redirecTo,
                    permanent: false,
                },
            };
        }

        return {
            props: {
                fallback: {
                    [getCustomerQuery]: customer,
                },
            },
        };
    };
}
