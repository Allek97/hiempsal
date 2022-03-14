import type { AppProps } from "next/app";
import { FC } from "react";

import UsernavUIProvider from "@components/ui/usernavContext";
import ProductUIProvider from "@components/ui/productContext";
import ThemeUIProvider from "@components/ui/themeContext";

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
        <UsernavUIProvider>
            <ProductUIProvider>
                <ThemeUIProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeUIProvider>
            </ProductUIProvider>
        </UsernavUIProvider>
    );
}

export default MyApp;
