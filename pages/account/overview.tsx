import { Overview } from "@components/account";
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

const OverviewPage = ({ fallback }: Props) => {
    return (
        <>
            <Seo
                title="Overview"
                description="An overview of your account that will notify you of your pending orders"
                canonical={`${DOMAIN}/account/overview`}
            />
            <SWRConfig value={{ fallback }}>
                <Overview />
            </SWRConfig>
        </>
    );
};

OverviewPage.Layout = Layout;

export default OverviewPage;
