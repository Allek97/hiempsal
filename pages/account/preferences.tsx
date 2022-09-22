import { Preferences } from "@components/account/preferences";
import { Layout } from "@components/common";

import { withAuthServerSideProps } from "auth/withAuthServerSide";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { SWRConfig } from "swr";

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps(
    {}
);
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const PreferencesPage = ({ fallback }: Props) => {
    return (
        <SWRConfig value={{ fallback }}>
            <Preferences />
        </SWRConfig>
    );
};

PreferencesPage.Layout = Layout;

export default PreferencesPage;
