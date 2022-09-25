/* eslint-disable react/require-default-props */
import { FC } from "react";
import type { AppProps } from "next/app";

import UIProvider from "@components/ui/context";
import ThemeUIProvider from "@components/ui/themeContext";
import HistoryProvider from "@contexts/History";

import { ProductInfoProvider } from "@components/product";

import { MediaContextProvider } from "@lib/media";
import { useScollToTop } from "@hooks";

import "../styles/globals.scss";
import "../assets/base.css";

// eslint-disable-next-line react/jsx-no-useless-fragment
const Noop: FC = ({ children }) => <>{children}</>;

function MyApp({
    Component,
    pageProps,
}: AppProps & {
    Component: { Layout: FC; Variables?: { [key: string]: any } };
}) {
    const Layout = Component.Layout ?? Noop;

    useScollToTop();

    return (
        <UIProvider>
            <ThemeUIProvider>
                <HistoryProvider>
                    <MediaContextProvider>
                        <ProductInfoProvider>
                            <Layout {...Component.Variables}>
                                <Component {...pageProps} />
                            </Layout>
                        </ProductInfoProvider>
                    </MediaContextProvider>
                </HistoryProvider>
            </ThemeUIProvider>
        </UIProvider>
    );
}

export default MyApp;
