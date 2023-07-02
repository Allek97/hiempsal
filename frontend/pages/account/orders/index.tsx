import { Orders } from "@components/account";
import { Layout } from "@components/common";
import Seo from "@components/SEO";
import { DOMAIN } from "@framework/const";

import { withAuthServerSideProps } from "auth/withAuthServerSide";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { SWRConfig } from "swr";

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps(
    {}
);
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const OrderPage = ({ fallback }: Props) => {
    return (
        <>
            <Seo
                title="Orders"
                description="Get access to all your order history"
                canonical={`${DOMAIN}/account/orders`}
            />
            <SWRConfig value={{ fallback }}>
                <Orders />
            </SWRConfig>
        </>
    );
};

OrderPage.Layout = Layout;

export default OrderPage;
