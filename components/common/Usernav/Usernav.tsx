import { FC, MutableRefObject, ReactNode, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { HiArrowNarrowRight } from "react-icons/hi";
import { BsBack } from "react-icons/bs";

import { useMediaQueryNext } from "@hooks";

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
    const router = useRouter();
    const isCartSelected = router.pathname === "/cart/bag";
    const isWishlistSelected = router.pathname === "/cart/wishlist";
    const isViewedProductSelected = router.pathname === "/cart/products";

    const rootRef = useRef() as MutableRefObject<HTMLDivElement>;
    const contentRef = useRef() as MutableRefObject<HTMLDivElement>;

    const isScreenLarge = useMediaQueryNext("lg");

    return (
        <Root ref={rootRef}>
            <Navigation>
                <nav>
                    <Link href="/cart/bag" passHref>
                        <NavBtn
                            isFirst
                            isSelected={isCartSelected}
                            type="button"
                            aria-label="Cart"
                        >
                            <HiArrowNarrowRight />
                            <h1>Your Cart</h1>
                        </NavBtn>
                    </Link>
                    <Link href="/cart/wishlist" passHref>
                        <NavBtn
                            isSelected={isWishlistSelected}
                            type="button"
                            aria-label="Wish list"
                        >
                            <HiArrowNarrowRight />
                            <h1>Wish list</h1>
                        </NavBtn>
                    </Link>
                    <Link href="/cart/products" passHref>
                        <NavBtn
                            isSelected={isViewedProductSelected}
                            type="button"
                            aria-label="Viewed products"
                        >
                            <HiArrowNarrowRight />
                            <h1>Viewed products</h1>
                        </NavBtn>
                    </Link>
                    {isScreenLarge && (
                        <Link href="/cart/products" passHref>
                            <NavBtn
                                type="button"
                                aria-label="Home"
                                isSelected={false}
                                isLast
                            >
                                <BsBack fill="var(--accents-9)" />
                                <h1>Home</h1>
                            </NavBtn>
                        </Link>
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
