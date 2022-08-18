import { FC, MutableRefObject, useEffect, useRef } from "react";
import {
    clearAllBodyScrollLocks,
    disableBodyScroll,
    enableBodyScroll,
} from "body-scroll-lock";

import { useUI } from "@components/ui/context";

import { Media } from "@lib/media";

import { MobileNav, NavBar } from "..";

import { Fit, Root } from "./Layout.styled";
import { Footer } from "../Footer";

const Layout: FC = ({ children }) => {
    const { isMobileMenuOpen } = useUI();

    const ref = useRef() as MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        if (ref.current) {
            if (isMobileMenuOpen) disableBodyScroll(ref.current);
            else enableBodyScroll(ref.current);
        }
        return () => {
            clearAllBodyScrollLocks();
        };
    }, [isMobileMenuOpen]);

    return (
        <Root ref={ref}>
            <NavBar />
            <Media lessThan="lg">
                <MobileNav />
            </Media>

            <Fit>{children}</Fit>
            <Footer />
        </Root>
    );
};

export default Layout;
