import { FC, MutableRefObject, useEffect, useRef } from "react";
import {
    clearAllBodyScrollLocks,
    disableBodyScroll,
    enableBodyScroll,
} from "body-scroll-lock";

import { useUsernavUI } from "@components/ui/usernavContext";

import { NavBar } from "..";
import { Fit, Root } from "./Layout.styled";
import { Usernav } from "../Usernav";

const Layout: FC = ({ children }) => {
    const { isUsernavOpen, isMobileMenuOpen } = useUsernavUI();

    const ref = useRef() as MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        if (ref.current) {
            if (isMobileMenuOpen || isUsernavOpen)
                disableBodyScroll(ref.current);
            else enableBodyScroll(ref.current);
        }
        return () => {
            clearAllBodyScrollLocks();
        };
    }, [isMobileMenuOpen, isUsernavOpen]);

    return (
        <Root ref={ref}>
            <NavBar />
            <Usernav />
            <Fit>{children}</Fit>
        </Root>
    );
};

export default Layout;
