import { FC } from "react";
import { Fit, Root } from "./Layout.styled";

const Layout: FC = ({ children }) => {
    return (
        <Root>
            <Fit>{children}</Fit>
        </Root>
    );
};

export default Layout;
