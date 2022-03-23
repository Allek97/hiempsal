import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useUI } from "@components/ui/context";

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
    Wrapper,
    HiemsalWrapper,
    NavbarItem,
    Navigation,
    Profile,
    NavbarRoot,
    UtilWrapper,
    Container,
} from "./NavBar.styled";
import { MobileNav } from "..";

const Navbar: FC = () => {
    const router = useRouter();
    const isUsernavOpen = router.pathname.includes("cart");

    const { isProductPopupOpen, isMobileMenuOpen } = useUI();

    const isScreenLarge = useMediaQueryNext("lg");

    const scrollThreshold = isScreenLarge ? 20 : 0;
    const isScrolled = useScroll(scrollThreshold);

    return (
        <>
            {!isScreenLarge && <MobileNav />}
            <NavbarRoot
                isScrolled={isScrolled}
                isMobileMenuOpen={isMobileMenuOpen}
                isProductPopupOpen={isProductPopupOpen}
                isUsernavOpen={isUsernavOpen}
            >
                <Container
                    isScrolled={isScrolled}
                    isMobileMenuOpen={isMobileMenuOpen}
                >
                    <Navigation>
                        <div className="flex items-center">
                            {!isMobileMenuOpen && (
                                <Link href="/" passHref scroll={false}>
                                    <Wrapper
                                        isUsernavOpen={isUsernavOpen}
                                        onClick={() => router.back()}
                                    >
                                        {isUsernavOpen ? <Arrow /> : <Logo />}
                                    </Wrapper>
                                </Link>
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
                        <Link href="/" passHref scroll={false}>
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
                                <button aria-label="Wish list" type="button">
                                    <Heart />
                                </button>
                                <button aria-label="Cart" type="button">
                                    <Bag />
                                </button>
                                <button aria-label="Profile" type="button">
                                    <Profile />
                                </button>
                            </UtilWrapper>
                        )}
                    </Navigation>
                </Container>
            </NavbarRoot>
        </>
    );
};

export default Navbar;
