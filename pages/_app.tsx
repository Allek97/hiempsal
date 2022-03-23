import { FC } from "react";
import type { AppProps } from "next/app";

import UIProvider from "@components/ui/context";
import ThemeUIProvider from "@components/ui/themeContext";
import HistoryProvider from "@contexts/History";

import "../styles/globals.scss";
import "../assets/base.css";

// eslint-disable-next-line react/jsx-no-useless-fragment
const Noop: FC = ({ children }) => <>{children}</>;

function MyApp({
    Component,
    pageProps,
}: AppProps & { Component: { Layout: FC } }) {
    const Layout = Component.Layout ?? Noop;

    return (
        <UIProvider>
            <ThemeUIProvider>
                <HistoryProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </HistoryProvider>
            </ThemeUIProvider>
        </UIProvider>
    );
}

export default MyApp;
