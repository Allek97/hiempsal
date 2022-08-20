/* eslint-disable @typescript-eslint/no-empty-function */
import { FC, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useUI } from "@components/ui/context";
import { useHistory } from "@contexts/History";

import { Media } from "@lib/media";
import { useMediaQueryNext, useScroll, useScrollDirectionNext } from "@hooks";

import { BsPerson } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";

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

const Navbar: FC = () => {
    const router = useRouter();
    const isUsernavOpen = router.pathname.includes("cart");
    const isLoginOpen = router.pathname.includes("login");

    const isHistoric: boolean = useMemo(
        () => isLoginOpen || isUsernavOpen,
        [isLoginOpen, isUsernavOpen]
    );

    const { isPopupOpen, isMobileMenuOpen } = useUI();
    const { back } = useHistory();

    const isScreenLarge = useMediaQueryNext("lg");

    const scrollThreshold = isScreenLarge ? 20 : 0;

    const isScrolled = useScroll(scrollThreshold);

    const isHidden = useScroll(150);
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
                isLoginOpen={isLoginOpen}
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
                                    <Back isLogin={isLoginOpen} />
                                ) : (
                                    <Logo />
                                )}
                            </WrapperBtn>
                        )}
                        {!isLoginOpen && (
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
                            isLoginOpen={isLoginOpen}
                            isScrolled={isScrolled}
                            role="button"
                        >
                            {isLoginOpen ? <HiempsalRed /> : <Hiempsal />}
                        </HiemsalWrapper>
                    </Link>
                    <Media greaterThanOrEqual="lg">
                        <UtilWrapper>
                            <Link href="/cart/wishlist" passHref>
                                <button aria-label="Wish list" type="button">
                                    <FaRegHeart />
                                </button>
                            </Link>
                            <Link href="/cart/bag" passHref>
                                <button aria-label="Cart" type="button">
                                    <Bag />
                                </button>
                            </Link>
                            <Link href="/login" passHref>
                                <button aria-label="Profile" type="button">
                                    <BsPerson />
                                </button>
                            </Link>
                        </UtilWrapper>
                    </Media>
                </Navigation>
            </Container>
        </NavbarRoot>
    );
};

export default Navbar;
