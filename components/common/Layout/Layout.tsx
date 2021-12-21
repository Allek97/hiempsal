import { FC } from "react";
import { NavBar } from "..";
import { Fit, Root } from "./Layout.styled";

const Layout: FC = ({ children }) => {
    return (
        <Root>
            <NavBar />
            <Fit>{children}</Fit>
        </Root>
    );
};

export default Layout;
