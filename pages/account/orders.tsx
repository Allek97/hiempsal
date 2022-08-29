import { Account } from "@components/account";
import { Layout } from "@components/common";
import { withAuthServerSideProps } from "auth/withAuthServerSide";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { SWRConfig } from "swr";

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps(
    {}
);
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const OrderPage = ({ fallback }: Props) => {
    return (
        <SWRConfig value={{ fallback }}>
            <Account />
        </SWRConfig>
    );
};

OrderPage.Layout = Layout;

export default OrderPage;
