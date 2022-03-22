import { FC, MutableRefObject, ReactNode, useEffect, useRef } from "react";
import Link from "next/link";

import { HiArrowNarrowRight } from "react-icons/hi";
import { VscEyeClosed } from "react-icons/vsc";

import { useUI } from "@components/ui/context";
import { useMediaQueryNext } from "lib/customHooks";

import { HelpCard } from "../../elements/helpCard";

import {
    Content,
    HelpCardWrapper,
    NavBtn,
    Navigation,
    Root,
    ShopPolicy,
} from "./Usernav.styled";

interface Props {
    children: ReactNode;
}

const Usernav: FC<Props> = ({ children }) => {
    const rootRef = useRef() as MutableRefObject<HTMLDivElement>;
    const contentRef = useRef() as MutableRefObject<HTMLDivElement>;

    const isScreenLarge = useMediaQueryNext("lg");

    const { isMobileMenuOpen } = useUI();

    return (
        <Root ref={rootRef}>
            <Navigation>
                <nav>
                    <Link href="/cart/bag" passHref>
                        <NavBtn type="button" aria-label="Cart">
                            <HiArrowNarrowRight />
                            <h1>Your Cart</h1>
                        </NavBtn>
                    </Link>
                    <Link href="/cart/wishlist" passHref>
                        <NavBtn type="button" aria-label="Wish list">
                            <HiArrowNarrowRight />
                            <h1>Wish list</h1>
                        </NavBtn>
                    </Link>

                    <NavBtn type="button" aria-label="Viewed products">
                        <HiArrowNarrowRight />
                        <h1>Viewed products</h1>
                    </NavBtn>
                    {isScreenLarge && (
                        <NavBtn
                            type="button"
                            aria-label="Close Usernav"
                            isSelected={false}
                        >
                            <VscEyeClosed />
                            <h1>Close</h1>
                        </NavBtn>
                    )}
                    {isScreenLarge && (
                        <HelpCardWrapper>
                            <HelpCard />
                        </HelpCardWrapper>
                    )}
                </nav>
            </Navigation>

            <Content ref={contentRef}>
                {children}
                <ShopPolicy>
                    <span>Delivery time: 5-7 business days</span>
                    <span>100-day return period</span>
                    <span>Free returns</span>
                    <span>Free shipping from $50.00 CAD</span>
                </ShopPolicy>
            </Content>
        </Root>
    );
};

export default Usernav;
