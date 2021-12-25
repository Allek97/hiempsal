import { FC } from "react";
import UIProvider from "@components/ui/context";
import { NavBar } from "..";
import { Fit, Root } from "./Layout.styled";
import { Usernav } from "../Usernav";

const Layout: FC = ({ children }) => {
    return (
        <UIProvider>
            <Root>
                <NavBar />
                <Usernav />
                <Fit>{children}</Fit>
            </Root>
        </UIProvider>
    );
};

export default Layout;
