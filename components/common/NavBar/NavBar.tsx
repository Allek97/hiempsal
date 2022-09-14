/* eslint-disable @typescript-eslint/no-empty-function */
import { FC, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useUI } from "@components/ui/context";
import { useHistory } from "@contexts/History";

import { Media } from "@lib/media";
import { useMediaQueryNext, useScroll, useScrollDirectionNext } from "@hooks";

import { BsPerson } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import {
    Bag,
    Logo,
    TextLogo as Hiempsal,
    TextLogoRed as HiempsalRed,
    Arrow,
} from "@components/icons";
import { HiOutlineArrowLeft } from "react-icons/hi";

import {
    HiemsalWrapper,
    NavbarItem,
    Navigation,
    NavbarRoot,
    UtilWrapper,
    Container,
    WrapperBtn,
    BackBtn,
    UtilityButton,
} from "./NavBar.styled";

const Back: FC<{ isLogin: boolean }> = ({ isLogin }) => {
    return (
        <div>
            {isLogin ? (
                <BackBtn className="block">
                    <HiOutlineArrowLeft />
                </BackBtn>
            ) : (
                <Arrow />
            )}
        </div>
    );
};

interface Props {
    cartSize: number;
    wishlistSize: number;
}

const Navbar: FC<Props> = ({ cartSize, wishlistSize }) => {
    const router = useRouter();
    const isUsernavOpen = router.pathname.includes("cart");
    const isAuthentificationOpen = router.pathname.includes("authentification");
    const isAccount = router.pathname.includes("account");

    const isHistoric: boolean = useMemo(
        () => isAuthentificationOpen || isUsernavOpen || isAccount,
        [isAuthentificationOpen, isUsernavOpen, isAccount]
    );

    const { isPopupOpen, isMobileMenuOpen } = useUI();
    const { back } = useHistory();

    const isScreenLarge = useMediaQueryNext("lg");

    const scrollThreshold = isScreenLarge ? 20 : 0;

    const isScrolled = useScroll(scrollThreshold);

    const hiddenThreshold = isScreenLarge ? 150 : 50;
    const isHidden = useScroll(hiddenThreshold);
    const { direction } = useScrollDirectionNext();

    return (
        <NavbarRoot
            isScrolled={isScrolled}
            isMobileMenuOpen={isMobileMenuOpen}
            isPopupOpen={isPopupOpen}
            isUsernavOpen={isUsernavOpen}
            isHidden={isHidden && direction === "down" && !isMobileMenuOpen}
        >
            <Container
                isScrolled={isScrolled}
                isMobileMenuOpen={isMobileMenuOpen}
                isAuthentificationOpen={isAuthentificationOpen}
            >
                <Navigation>
                    <div className="flex items-center">
                        {!isMobileMenuOpen && (
                            <WrapperBtn
                                onClick={() => back("/")}
                                isHistoric={isHistoric}
                                type="button"
                            >
                                {isHistoric ? (
                                    <Back isLogin={isAuthentificationOpen} />
                                ) : (
                                    <Logo />
                                )}
                            </WrapperBtn>
                        )}
                        {!isAuthentificationOpen && (
                            <Media greaterThanOrEqual="lg">
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
                            </Media>
                        )}
                    </div>
                    <Link href="/" passHref>
                        <HiemsalWrapper
                            isUsernavOpen
                            isAuthentificationOpen={isAuthentificationOpen}
                            isScrolled={isScrolled}
                            role="button"
                        >
                            {isAuthentificationOpen ? (
                                <HiempsalRed />
                            ) : (
                                <Hiempsal />
                            )}
                        </HiemsalWrapper>
                    </Link>
                    <Media greaterThanOrEqual="lg">
                        <UtilWrapper>
                            <Link href="/cart/wishlist" passHref>
                                <UtilityButton
                                    aria-label="Wish list"
                                    type="button"
                                    $isWishlist
                                    whileHover={
                                        wishlistSize > 0
                                            ? {
                                                  scale: 1.1,
                                              }
                                            : { color: "var(--orange-red)" }
                                    }
                                >
                                    {wishlistSize > 0 ? (
                                        <FaHeart
                                            style={{
                                                fill: "var(--orange-red)",
                                            }}
                                        />
                                    ) : (
                                        <FaRegHeart />
                                    )}
                                    {wishlistSize > 0 && (
                                        <span>{wishlistSize}</span>
                                    )}
                                </UtilityButton>
                            </Link>
                            <Link href="/cart/bag" passHref>
                                <UtilityButton aria-label="Cart" type="button">
                                    <Bag />
                                    {cartSize > 0 && <span>{cartSize}</span>}
                                </UtilityButton>
                            </Link>
                            <Link href="/account/overview" passHref>
                                <UtilityButton
                                    aria-label="Profile"
                                    type="button"
                                >
                                    <BsPerson />
                                </UtilityButton>
                            </Link>
                        </UtilWrapper>
                    </Media>
                </Navigation>
            </Container>
        </NavbarRoot>
    );
};

export default Navbar;
