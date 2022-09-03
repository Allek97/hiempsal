import { OrderView } from "@components/account/order";
import { Layout } from "@components/common";
import { getConfig } from "@framework/api/config";
import { SHOPIFY_CUSTOMER_TOKEN_COOKIE } from "@framework/const";
import getCustomer from "@framework/customer/get-customer";
import getOrder from "@framework/order/get-order";
import { Order } from "@framework/types/order";
import Cookies from "js-cookie";
import {
    GetStaticPaths,
    GetStaticPropsContext,
    InferGetStaticPropsType,
} from "next";

const NOT_CONNECTED = "NOT_CONNECTED";
export const getStaticPaths: GetStaticPaths = async () => {
    const config = getConfig();
    const customerAccessToken = Cookies.get(SHOPIFY_CUSTOMER_TOKEN_COOKIE);
    const customer = await getCustomer({ config, customerAccessToken });

    if (!customer) {
        return {
            paths: [
                {
                    params: {
                        id: NOT_CONNECTED,
                    },
                },
            ],
            fallback: false,
        };
    }

    console.log(customer.orders);

    return {
        paths: customer.orders.map((order) => ({
            params: {
                id: order.id.split("/").pop(),
            },
        })),

        fallback: false,
    };
};

export const getStaticProps = async ({
    params,
}: GetStaticPropsContext<{
    id: string;
}>) => {
    if (params?.id === NOT_CONNECTED) {
        return {
            redirect: {
                destination: "authentification",
                permanent: false,
            },
        };
    }
    const ORDER_ID_PREFIX = "gid://shopify/Order/";
    const config = getConfig();
    const { order } = await getOrder({
        config,
        variables: {
            orderId: params?.id ? `${ORDER_ID_PREFIX}${params.id}` : "",
        },
    });

    return {
        props: {
            order,
        },
    };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const OrderIdPage = ({ order }: Props) => {
    return <OrderView order={order as Order} />;
};

OrderIdPage.Layout = Layout;

export default OrderIdPage;
