/* eslint-disable @typescript-eslint/no-empty-function */
import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useUI } from "@components/ui/context";
import { useHistory } from "@contexts/History";

import { useMediaQueryNext } from "lib/customHooks";
import useScroll from "lib/customHooks/useScroll";

import {
    Bag,
    Heart,
    Logo,
    TextLogo as Hiempsal,
    Arrow,
} from "@components/icons";

import {
    HiemsalWrapper,
    NavbarItem,
    Navigation,
    Profile,
    NavbarRoot,
    UtilWrapper,
    Container,
    WrapperBtn,
} from "./NavBar.styled";
import { MobileNav } from "..";

const Navbar: FC = () => {
    const router = useRouter();
    const isUsernavOpen = router.pathname.includes("cart");

    const { isPopupOpen, isMobileMenuOpen } = useUI();
    const { back } = useHistory();

    const isScreenLarge = useMediaQueryNext("lg");

    const scrollThreshold = isScreenLarge ? 20 : 0;

    const isScrolled = useScroll(scrollThreshold);

    return (
        <>
            {/* {!isScreenLarge && <MobileNav />} */}
            <MobileNav />
            <NavbarRoot
                isScrolled={isScrolled}
                isMobileMenuOpen={isMobileMenuOpen}
                isPopupOpen={isPopupOpen}
                isUsernavOpen={isUsernavOpen}
            >
                <Container
                    isScrolled={isScrolled}
                    isMobileMenuOpen={isMobileMenuOpen}
                >
                    <Navigation>
                        <div className="flex items-center">
                            {!isMobileMenuOpen && (
                                <WrapperBtn
                                    onClick={
                                        isUsernavOpen
                                            ? () => back("/")
                                            : () => {}
                                    }
                                    isUsernavOpen={isUsernavOpen}
                                    type="button"
                                >
                                    {isUsernavOpen ? <Arrow /> : <Logo />}
                                </WrapperBtn>
                            )}
                            {isScreenLarge && (
                                <nav>
                                    <Link href="/" passHref>
                                        <NavbarItem
                                            isUsernavOpen
                                            isUsernavScrolled={false}
                                            type="button"
                                            aria-label="All"
                                        >
                                            All
                                        </NavbarItem>
                                    </Link>
                                    <Link href="/" passHref>
                                        <NavbarItem
                                            isUsernavOpen
                                            isUsernavScrolled={false}
                                            type="button"
                                            aria-label="Clothes"
                                        >
                                            Clothes
                                        </NavbarItem>
                                    </Link>
                                    <Link href="/" passHref>
                                        <NavbarItem
                                            isUsernavOpen
                                            isUsernavScrolled={false}
                                            type="button"
                                            aria-label="Technologies"
                                        >
                                            Technologies
                                        </NavbarItem>
                                    </Link>
                                    <Link href="/" passHref>
                                        <NavbarItem
                                            isUsernavOpen
                                            isUsernavScrolled={false}
                                            type="button"
                                            aria-label="More"
                                        >
                                            More
                                        </NavbarItem>
                                    </Link>
                                </nav>
                            )}
                        </div>
                        <Link href="/" passHref>
                            <HiemsalWrapper
                                isUsernavOpen
                                isScrolled={isScrolled}
                                role="button"
                            >
                                <Hiempsal />
                            </HiemsalWrapper>
                        </Link>
                        {isScreenLarge && (
                            <UtilWrapper>
                                <Link href="/cart/wishlist" passHref>
                                    <button
                                        aria-label="Wish list"
                                        type="button"
                                    >
                                        <Heart />
                                    </button>
                                </Link>
                                <Link href="/cart/bag" passHref>
                                    <button aria-label="Cart" type="button">
                                        <Bag />
                                    </button>
                                </Link>
                                <Link href="/" passHref>
                                    <button aria-label="Profile" type="button">
                                        <Profile />
                                    </button>
                                </Link>
                            </UtilWrapper>
                        )}
                    </Navigation>
                </Container>
            </NavbarRoot>
        </>
    );
};

export default Navbar;
