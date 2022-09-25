import { Layout } from "@components/common";
import { ViewedProduct } from "@components/viewedProduct";
import { getConfig } from "@framework/api/config";
import {
    SHOPIFY_CUSTOMER_TOKEN_COOKIE,
    SHOPIFY_VIEWED_TOKEN_COOKIE,
} from "@framework/const";
import getCustomerId from "@framework/customer/get-customer-id";
import getViewed from "@framework/viewed/get-viewed";

import {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
    PreviewData,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { SWRConfig } from "swr";

export const getServerSideProps = async (
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
    try {
        const config = getConfig();
        const customerAccessToken: string | undefined =
            context.req.cookies[SHOPIFY_CUSTOMER_TOKEN_COOKIE];
        const viewedToken: string | undefined =
            context.req.cookies[SHOPIFY_VIEWED_TOKEN_COOKIE];

        const customerId = await getCustomerId({ config, customerAccessToken });
        const viewedProducts = await getViewed({
            config,
            customerId: customerId ?? undefined,
            viewedToken: viewedToken ?? undefined,
            url: context.resolvedUrl,
        });

        return {
            props: {
                customerId,
                fallback: {
                    "/api/viewed": viewedProducts ?? null,
                },
            },
        };
    } catch (err) {
        return {
            props: {
                customerId: null,
                fallback: {
                    "/api/viewed": null,
                },
            },
        };
    }
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ViewedProductsPage({ fallback, customerId }: Props) {
    return (
        <SWRConfig value={{ fallback }}>
            <ViewedProduct customerId={customerId} />
        </SWRConfig>
    );
}

ViewedProductsPage.Layout = Layout;
