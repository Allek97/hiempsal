import { Cart } from "@components/cart";
import { Layout } from "@components/common";
import { getConfig } from "@framework/api/config";
import {
    SHOPIFY_CHECKOUT_ID_COOKIE,
    SHOPIFY_CUSTOMER_TOKEN_COOKIE,
} from "@framework/const";
import {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
    PreviewData,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { getCheckoutQuery } from "@framework/utils/queries";
import getCart from "@framework/cart/get-cart";
import { SWRConfig } from "swr";

export const getServerSideProps = async (
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
    const config = getConfig();
    const checkoutToken: string | undefined =
        context.req.cookies[SHOPIFY_CHECKOUT_ID_COOKIE];
    const customerAccessToken: string | undefined =
        context.req.cookies[SHOPIFY_CUSTOMER_TOKEN_COOKIE];

    const cart = await getCart({
        config,
        checkoutId: checkoutToken,
        customerAccessToken,
    });

    return {
        props: {
            fallback: {
                [getCheckoutQuery]: cart,
            },
        },
    };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Bag({ fallback }: Props) {
    return (
        <SWRConfig value={{ fallback }}>
            <Cart />
        </SWRConfig>
    );
}

Bag.Layout = Layout;
