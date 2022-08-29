import { Account } from "@components/account";
import { Layout } from "@components/common";
import { getConfig } from "@framework/api/config";
import { SHOPIFY_CUSTOMER_TOKEN_COOKIE } from "@framework/const";
import getCustomer from "@framework/customer/get-customer";
import { getCustomerQuery } from "@framework/utils";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { SWRConfig } from "swr";

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

    return {
        props: {
            fallback: {
                [getCustomerQuery]: customer,
            },
        },
    };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Overview = ({ fallback }: Props) => {
    return (
        <SWRConfig value={{ fallback }}>
            <Account />
        </SWRConfig>
    );
};

Overview.Layout = Layout;

export default Overview;
