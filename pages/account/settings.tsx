import { Settings } from "@components/account";
import { SettingsProvider } from "@components/account/settings/context";
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

const SettingsPage = ({ fallback }: Props) => {
    return (
        <>
            <Seo
                title="Settings"
                description="Here you can modify and update your account informations including your default address, password and personal identifying information."
                canonical={`${DOMAIN}/account/settings`}
            />
            <SettingsProvider>
                <SWRConfig value={{ fallback }}>
                    <Settings />
                </SWRConfig>
            </SettingsProvider>
        </>
    );
};

SettingsPage.Layout = Layout;

export default SettingsPage;
