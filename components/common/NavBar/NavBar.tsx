import { FC } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { Container } from "@components/ui/Container";
import { Bag, Heart, Logo, TextLogo as Hiempsal } from "@components/icons";
import { useUI } from "@components/ui/context";
import { MobileMenu } from "..";

import {
    HiemsalWrapper,
    LogoWrapper,
    NavbarItem,
    Navigation,
    Profile,
    NavbarRoot,
    UtilWrapper,
} from "./NavBar.styled";

const Navbar: FC = () => {
    const { isUsernavOpen, openCart } = useUI();

    const isDesktop = useMediaQuery({ query: `(min-width: 64em)` });

    return (
        <>
            {!isDesktop && <MobileMenu />}
            <NavbarRoot isUsernavOpen={isUsernavOpen}>
                <Container>
                    <Navigation>
                        <div className="flex items-center space-x-5">
                            <Link href="/" passHref>
                                <LogoWrapper isUsernavOpen={isUsernavOpen}>
                                    <Logo />
                                </LogoWrapper>
                            </Link>
                            {isDesktop && (
                                <nav className="space-x-5">
                                    <Link href="/" passHref>
                                        <NavbarItem>All</NavbarItem>
                                    </Link>
                                    <Link href="/" passHref>
                                        <NavbarItem>Clothes</NavbarItem>
                                    </Link>
                                    <Link href="/" passHref>
                                        <NavbarItem>Technologies</NavbarItem>
                                    </Link>
                                    <Link href="/" passHref>
                                        <NavbarItem>More</NavbarItem>
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
