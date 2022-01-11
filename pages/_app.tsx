import type { AppProps } from "next/app";
import { FC } from "react";
import "../styles/globals.scss";
import "../assets/base.css";

import UIProvider from "@components/ui/context";

// eslint-disable-next-line react/jsx-no-useless-fragment
const Noop: FC = ({ children }) => <>{children}</>;

function MyApp({
    Component,
    pageProps,
}: AppProps & { Component: { Layout: FC } }) {
    const Layout = Component.Layout ?? Noop;

    return (
        <UIProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </UIProvider>
    );
}

export default MyApp;
