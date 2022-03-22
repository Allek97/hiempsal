import { FC, MutableRefObject, useEffect, useRef } from "react";
import {
    clearAllBodyScrollLocks,
    disableBodyScroll,
    enableBodyScroll,
} from "body-scroll-lock";

import { useUsernavUI } from "@components/ui/usernavContext";

import { NavBar } from "..";
import { Fit, Root } from "./Layout.styled";

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

            <Fit>{children}</Fit>
            <footer className="h-96 bg-red">asdasd</footer>
        </Root>
    );
};

export default Layout;
