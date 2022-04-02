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
            <footer className="h-96 bg-red">asdasd</footer>
        </Root>
    );
};

export default Layout;
