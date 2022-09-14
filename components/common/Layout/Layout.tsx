/* eslint-disable react/require-default-props */
import { FC, MutableRefObject, useEffect, useMemo, useRef } from "react";
import {
    clearAllBodyScrollLocks,
    disableBodyScroll,
    enableBodyScroll,
} from "body-scroll-lock";

import { useUI } from "@components/ui/context";
import useCart from "@framework/cart/use-cart";
import useWishlist from "@framework/wishlist/use-wishlist";
import { getWishlistToken } from "@framework/utils/wishlist-token";

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

    const { data: cart } = useCart();
    const getWishlist = useWishlist();
    const { data: wishlist } = getWishlist({
        wishlistToken: getWishlistToken()!,
    });

    const wishlistSize: number = useMemo(
        () => wishlist?.products.length ?? 0,
        [wishlist?.products]
    );
    const cartSize: number = useMemo(
        () =>
            cart?.lineItems.reduce((prev, curr) => prev + curr.quantity, 0) ??
            0,
        [cart?.lineItems]
    );

    return (
        <Root ref={ref}>
            {isNavbar && (
                <NavBar cartSize={cartSize} wishlistSize={wishlistSize} />
            )}

            {isMobileNav && (
                <Media lessThan="lg">
                    <MobileNav
                        cartSize={cartSize}
                        wishlistSize={wishlistSize}
                    />
                </Media>
            )}

            <Fit>{children}</Fit>
            {isFooter && <Footer />}
        </Root>
    );
};

export default Layout;
