import { Preferences } from "@components/account/preferences";
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

const PreferencesPage = ({ fallback }: Props) => {
    return (
        <>
            <Seo
                title="Preferences"
                description="Choose your notification preferences about marketing emails, where you can receive surprising promos and get notified of our latest products."
                canonical={`${DOMAIN}/account/preferences`}
            />
            <SWRConfig value={{ fallback }}>
                <Preferences />
            </SWRConfig>
        </>
    );
};

PreferencesPage.Layout = Layout;

export default PreferencesPage;
