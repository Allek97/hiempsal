import type { AppProps } from "next/app";
import { FC } from "react";

import UsernavUIProvider from "@components/ui/usernavContext";
import PopupUIProvider from "@components/ui/popupContext";
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
            <PopupUIProvider>
                <ThemeUIProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeUIProvider>
            </PopupUIProvider>
        </UsernavUIProvider>
    );
}

export default MyApp;
