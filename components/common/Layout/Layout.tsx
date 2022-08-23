/* eslint-disable react/require-default-props */
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

interface Props {
    isNavbar?: boolean;
    isFooter?: boolean;
    isMobileNav?: boolean;
}

const Layout: FC<Props> = ({
    children,
    isNavbar = true,
    isFooter = true,
    isMobileNav = true,
}) => {
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
            {isNavbar && <NavBar />}

            {isMobileNav && (
                <Media lessThan="lg">
                    <MobileNav />
                </Media>
            )}

            <Fit>{children}</Fit>
            {isFooter && <Footer />}
        </Root>
    );
};

export default Layout;
