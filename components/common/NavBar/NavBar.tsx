import { FC } from "react";
import Link from "next/link";
import { IoCloseSharp } from "react-icons/io5";

import { useUsernavUI } from "@components/ui/usernavContext";
import { useProductUI } from "@components/ui/productContext";

import { useMediaQueryNext } from "lib/customHooks";
import useScroll from "lib/customHooks/useScroll";

import { Bag, Heart, Logo, TextLogo as Hiempsal } from "@components/icons";

import { MobileNav } from "..";

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

const Navbar: FC = () => {
    const {
        isUsernavOpen,
        isUsernavScrolled,
        isMobileMenuOpen,
        closeUsernav,
        openCart,
        openWishList,
    } = useUsernavUI();

    const { isProductPopupOpen } = useProductUI();

    const isScreenLarge = useMediaQueryNext("lg");

    const scrollThreshold = isScreenLarge ? 70 : 10;
    const isScrolled = useScroll(scrollThreshold);

    return (
        <>
            {!isScreenLarge && <MobileNav />}
            <NavbarRoot
                isUsernavScrolled={isUsernavScrolled}
                isScrolled={isScrolled}
                isUsernavOpen={isUsernavOpen}
                isMobileMenuOpen={isMobileMenuOpen}
                isProductPopupOpen={isProductPopupOpen}
            >
                <Container
                    isUsernavOpen={isUsernavOpen}
                    isScrolled={isScrolled}
                    isUsernavScrolled={isUsernavScrolled}
                    isMobileMenuOpen={isMobileMenuOpen}
                >
                    <Navigation>
                        <div className="flex items-center space-x-5">
                            <Link href="/" passHref scroll={false}>
                                <Wrapper
                                    isUsernavOpen={isUsernavOpen}
                                    onClick={closeUsernav}
                                    onKeyPress={closeUsernav}
                                    role="button"
                                    // tabIndex={0}
                                >
                                    {isUsernavOpen &&
                                    !isMobileMenuOpen &&
                                    !isScreenLarge ? (
                                        <IoCloseSharp
                                            onClick={closeUsernav}
                                            role="button"
                                        />
                                    ) : (
                                        <Logo />
                                    )}
                                </Wrapper>
                            </Link>
                            {isScreenLarge && (
                                <nav className="space-x-5">
                                    <Link href="/" passHref>
                                        <NavbarItem
                                            isUsernavOpen={isUsernavOpen}
                                            isUsernavScrolled={
                                                isUsernavScrolled
                                            }
                                        >
                                            All
                                        </NavbarItem>
                                    </Link>
                                    <Link href="/" passHref>
                                        <NavbarItem
                                            isUsernavOpen={isUsernavOpen}
                                            isUsernavScrolled={
                                                isUsernavScrolled
                                            }
                                        >
                                            Clothes
                                        </NavbarItem>
                                    </Link>
                                    <Link href="/" passHref>
                                        <NavbarItem
                                            isUsernavOpen={isUsernavOpen}
                                            isUsernavScrolled={
                                                isUsernavScrolled
                                            }
                                        >
                                            Technologies
                                        </NavbarItem>
                                    </Link>
                                    <Link href="/" passHref>
                                        <NavbarItem
                                            isUsernavOpen={isUsernavOpen}
                                            isUsernavScrolled={
                                                isUsernavScrolled
                                            }
                                        >
                                            More
                                        </NavbarItem>
                                    </Link>
                                </nav>
                            )}
                        </div>
                        <Link href="/" passHref scroll={false}>
                            <HiemsalWrapper
                                isUsernavOpen={isUsernavOpen}
                                isScrolled={isScrolled}
                                onClick={closeUsernav}
                                role="button"
                            >
                                <Hiempsal />
                            </HiemsalWrapper>
                        </Link>
                        {isScreenLarge && (
                            <UtilWrapper>
                                <button
                                    aria-label="Wish list"
                                    type="button"
                                    onClick={openWishList}
                                >
                                    <Heart />
                                </button>
                                <button
                                    aria-label="Cart"
                                    type="button"
                                    onClick={openCart}
                                >
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
