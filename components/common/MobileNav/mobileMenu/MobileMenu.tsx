import { FC } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import { useUsernavUI } from "@components/ui/usernavContext";

import { EffectButton } from "@components/ui";
import { HelpCard } from "@components/elements/helpCard";

import {
    Complement,
    DecorationBottom,
    DecorationTop,
    Navigation,
    Root,
} from "./MobileMenu.styled";

const MobileMenu: FC = () => {
    const { isMobileMenuOpen } = useUsernavUI();
    return (
        <Root isMobileMenuOpen={isMobileMenuOpen}>
            <Navigation>
                <EffectButton type="button" aria-label="All">
                    <HiOutlineArrowNarrowRight />
                    <h1>All</h1>
                </EffectButton>
                <EffectButton type="button" aria-label="Clothes">
                    <HiOutlineArrowNarrowRight />
                    <h1>Clothes</h1>
                </EffectButton>
                <EffectButton type="button" aria-label="Technologies">
                    <HiOutlineArrowNarrowRight />
                    <h1>Technologies</h1>
                </EffectButton>
                <EffectButton type="button" aria-label="More">
                    <HiOutlineArrowNarrowRight />
                    <h1>More</h1>
                </EffectButton>
            </Navigation>

            <Complement>
                <EffectButton type="button" aria-label="Home">
                    <HiOutlineArrowNarrowRight />
                    <h1>Home</h1>
                </EffectButton>
                <EffectButton type="button" aria-label="About">
                    <HiOutlineArrowNarrowRight />
                    <h1>About</h1>
                </EffectButton>
                <EffectButton type="button" aria-label="Terms of use">
                    <HiOutlineArrowNarrowRight />
                    <h1>Terms of use</h1>
                </EffectButton>
                <EffectButton type="button" aria-label="Shipping & Returns">
                    <HiOutlineArrowNarrowRight />
                    <h1>Shipping & Returns</h1>
                </EffectButton>
                <EffectButton type="button" aria-label="Newsletter">
                    <HiOutlineArrowNarrowRight />
                    <h1>Newsletter</h1>
                </EffectButton>
            </Complement>

            <div className="relative flex">
                <HelpCard />
                <div className="ml-auto">
                    <DecorationTop />
                    <DecorationBottom />
                </div>
            </div>
        </Root>
    );
};

export default MobileMenu;
