import { Settings } from "@components/account";
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
        <SWRConfig value={{ fallback }}>
            <Settings />
        </SWRConfig>
    );
};

SettingsPage.Layout = Layout;

export default SettingsPage;
