import { FC } from "react";
import Link from "next/link";
import { IoCloseSharp } from "react-icons/io5";

import { useUI } from "@components/ui/context";
import { useMediaQueryNext } from "lib/customHooks";
import useScroll from "lib/customHooks/useScroll";

import { Bag, Heart, Logo, TextLogo as Hiempsal } from "@components/icons";

import { MobileMenu } from "..";

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
    const { isUsernavOpen, isUsernavScrolled, closeUsernav, openCart } =
        useUI();

    const isDesktop = useMediaQueryNext("lg");

    const isScrolled = useScroll(70, 10);

    return (
        <>
            {!isDesktop && <MobileMenu />}
            <NavbarRoot
                isUsernavScrolled={isUsernavScrolled}
                isScrolled={isScrolled}
                isUsernavOpen={isUsernavOpen}
            >
                <Container isUsernavOpen={isUsernavOpen}>
                    <Navigation>
                        <div className="flex items-center space-x-5">
                            <Link href="/" passHref scroll={false}>
                                <Wrapper isUsernavOpen={isUsernavOpen}>
                                    {isUsernavOpen && !isDesktop ? (
                                        <IoCloseSharp onClick={closeUsernav} />
                                    ) : (
                                        <Logo />
                                    )}
                                </Wrapper>
                            </Link>
                            {isDesktop && (
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

                        <HiemsalWrapper
                            isDesktop={isDesktop}
                            isUsernavOpen={isUsernavOpen}
                        >
                            <Hiempsal />
                        </HiemsalWrapper>
                        {isDesktop && (
                            <UtilWrapper>
                                <button aria-label="Wish list" type="button">
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
