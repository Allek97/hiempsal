import { FC } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { Container } from "@components/ui/Container";
import Logo from "@components/icons/Logo";
import Hiempsal from "@components/icons/Text";
import Heart from "@components/icons/Heart";
import Bag from "@components/icons/Bag";
import {
    HiemsalWrapper,
    LogoWrapper,
    NavbarItem,
    Navigation,
    Profile,
    Root,
    UtilWrapper,
} from "./NavBar.styled";
import { MobileMenu } from "..";

const Navbar: FC = () => {
    const isDesktopOrMobile = useMediaQuery({ query: `(min-width: 64em)` });
    return (
        <>
            <MobileMenu />
            <Root>
                <Container>
                    <Navigation>
                        <div className="flex items-center space-x-5">
                            <Link href="/" passHref>
                                <LogoWrapper>
                                    <Logo />
                                </LogoWrapper>
                            </Link>
                            {isDesktopOrMobile && (
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

                        <HiemsalWrapper>
                            <Hiempsal />
                        </HiemsalWrapper>
                        {isDesktopOrMobile && (
                            <UtilWrapper>
                                <Heart />
                                <Bag />
                                <button aria-label="Menu" type="button">
                                    <Profile />
                                </button>
                            </UtilWrapper>
                        )}
                    </Navigation>
                </Container>
            </Root>
        </>
    );
};

export default Navbar;
