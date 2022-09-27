import { OrderView } from "@components/account/order";
import { Layout } from "@components/common";
import Seo from "@components/SEO";
import { getConfig } from "@framework/api/config";
import { DOMAIN, SHOPIFY_CUSTOMER_TOKEN_COOKIE } from "@framework/const";
import getCustomer from "@framework/customer/get-customer";
import getOrder from "@framework/order/get-order";
import { Order } from "@framework/types/order";

import { getShopifyId } from "@lib/getShopifyId";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const config = getConfig();
    const customerAccessToken: string | undefined =
        context.req.cookies[SHOPIFY_CUSTOMER_TOKEN_COOKIE];
    const customer = await getCustomer({ config, customerAccessToken });

    if (!customer) {
        return {
            redirect: {
                destination: "/authentification",
                permanent: false,
            },
        };
    }

    const orderId = customer.orders.filter(
        (object) => getShopifyId(object.id) === context.params?.id
    )[0]?.id;

    const { order } = await getOrder({
        config,
        variables: {
            orderId,
        },
    });

    return {
        props: {
            order,
        },
    };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const OrderIdPage = ({ order }: Props) => {
    const router = useRouter();
    if (!router.isFallback && !order) {
        return <h1>404 - Sorry could not find this page</h1>;
    }
    return (
        <>
            <Seo
                title={`Order ${(order as Order).orderName}`}
                description={`Get access to all the details about the ${
                    (order as Order).orderName
                } order. You can track your order, add a review, consult your invoice and more.`}
                canonical={`${DOMAIN}/account/orders/${getShopifyId(order.id)}`}
            />
            <OrderView order={order as Order} />
        </>
    );
};

OrderIdPage.Layout = Layout;

export default OrderIdPage;
