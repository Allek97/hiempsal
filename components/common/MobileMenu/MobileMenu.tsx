import { FC } from "react";
import { EffectButton } from "@components/ui";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Navigation, Root } from "./MobileMenu.styled";

const MobileMenu: FC = () => {
    return (
        <Root>
            <Navigation>
                <EffectButton type="button" aria-label="All">
                    <HiArrowNarrowRight />
                    <h1>All</h1>
                </EffectButton>
                <EffectButton type="button" aria-label="Clothes">
                    <HiArrowNarrowRight />
                    <h1>Clothes</h1>
                </EffectButton>
                <EffectButton type="button" aria-label="Technologies">
                    <HiArrowNarrowRight />
                    <h1>Technologies</h1>
                </EffectButton>
                <EffectButton type="button" aria-label="More">
                    <HiArrowNarrowRight />
                    <h1>More</h1>
                </EffectButton>
            </Navigation>
        </Root>
    );
};

export default MobileMenu;
