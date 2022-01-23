import type { AppProps } from "next/app";
import { FC } from "react";
import "../styles/globals.scss";
import "../assets/base.css";

import UsernavUIProvider from "@components/ui/usernavContext";
import ProductUIProvider from "@components/ui/productContext";

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
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ProductUIProvider>
        </UsernavUIProvider>
    );
}

export default MyApp;
