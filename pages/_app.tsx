import type { AppProps } from "next/app";
import { FC } from "react";
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
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
