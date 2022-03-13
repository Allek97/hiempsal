import type { AppProps } from "next/app";
import { FC } from "react";

import UsernavUIProvider from "@components/ui/usernavContext";
import ProductUIProvider from "@components/ui/productContext";

import "../styles/globals.scss";
import "../assets/base.css";
import { theme } from "@components/ui";
import { ThemeProvider } from "@mui/material";

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
                <ThemeProvider theme={theme}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </ProductUIProvider>
        </UsernavUIProvider>
    );
}

export default MyApp;
