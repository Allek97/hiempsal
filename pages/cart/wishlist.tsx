import { Layout } from "@components/common";
import { Wishlist } from "@components/wishlist";
import { getConfig } from "@framework/api/config";
import {
    SHOPIFY_CUSTOMER_TOKEN_COOKIE,
    SHOPIFY_WISHLIST_TOKEN_COOKIE,
} from "@framework/const";
import getCustomerId from "@framework/customer/get-customer-id";
import getWishlist from "@framework/wishlist/get-wishlist";

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
        const wishlistToken: string | undefined =
            context.req.cookies[SHOPIFY_WISHLIST_TOKEN_COOKIE];

        const customerId = await getCustomerId({ config, customerAccessToken });
        const wishlist = await getWishlist({
            config,
            customerId: customerId ?? undefined,
            wishlistToken: wishlistToken ?? undefined,
        });

        return {
            props: {
                customerId,
                fallback: {
                    "/api/wishlist": wishlist ?? null,
                },
            },
        };
    } catch (err) {
        return {
            props: {
                customerId: null,
                fallback: {
                    "/api/wishlist": null,
                },
            },
        };
    }
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function WishlistPage({ fallback, customerId }: Props) {
    return (
        <SWRConfig value={{ fallback }}>
            <Wishlist customerId={customerId} />
        </SWRConfig>
    );
}

WishlistPage.Layout = Layout;
