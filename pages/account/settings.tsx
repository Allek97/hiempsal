import { Settings } from "@components/account";
import { SettingsProvider } from "@components/account/settings/context";
import { Layout } from "@components/common";
import { withAuthServerSideProps } from "auth/withAuthServerSide";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { SWRConfig } from "swr";

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps(
    {}
);
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const SettingsPage = ({ fallback }: Props) => {
    return (
        <SettingsProvider>
            <SWRConfig value={{ fallback }}>
                <Settings />
            </SWRConfig>
        </SettingsProvider>
    );
};

SettingsPage.Layout = Layout;

export default SettingsPage;
