import { FC, MutableRefObject, ReactNode, useEffect, useRef } from "react";
import Link from "next/link";

import { HiArrowNarrowRight } from "react-icons/hi";
import { VscEyeClosed } from "react-icons/vsc";

import { useUsernavUI } from "@components/ui/usernavContext";
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

    const {
        isUsernavOpen,
        isCartOpen,
        isWishListOpen,
        isViewedProductsOpen,
        openCart,
        openWishList,
        openViewedProducts,
        closeUsernav,
        setUsernavScrollStatus,
    } = useUsernavUI();

    useEffect(() => {
        if (rootRef.current || contentRef.current) {
            setUsernavScrollStatus(0);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUsernavOpen]);

    useEffect(() => {
        if (rootRef.current) rootRef.current.scrollTo(0, 0);
        if (contentRef.current) contentRef.current.scrollTo(0, 0);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCartOpen, isWishListOpen, isViewedProductsOpen]);

    const listenScrollEvent = () => {
        if (rootRef.current) {
            setUsernavScrollStatus(rootRef.current.scrollTop);
        }

        if (contentRef.current && isScreenLarge) {
            setUsernavScrollStatus(contentRef.current.scrollTop);
        }
    };

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {!isUsernavOpen && (
                <Root ref={rootRef} onScroll={listenScrollEvent}>
                    <Navigation>
                        <nav>
                            <Link href="/cart/bag" passHref>
                                <NavBtn
                                    type="button"
                                    aria-label="Cart"
                                    isSelected={isCartOpen}
                                >
                                    <HiArrowNarrowRight />
                                    <h1>Your Cart</h1>
                                </NavBtn>
                            </Link>
                            <Link href="/cart/wishlist" passHref>
                                <NavBtn
                                    type="button"
                                    aria-label="Wish list"
                                    isSelected={isWishListOpen}
                                >
                                    <HiArrowNarrowRight />
                                    <h1>Wish list</h1>
                                </NavBtn>
                            </Link>

                            <NavBtn
                                type="button"
                                aria-label="Viewed products"
                                isSelected={isViewedProductsOpen}
                            >
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

                    <Content ref={contentRef} onScroll={listenScrollEvent}>
                        {children}
                        <ShopPolicy>
                            <span>Delivery time: 5-7 business days</span>
                            <span>100-day return period</span>
                            <span>Free returns</span>
                            <span>Free shipping from $50.00 CAD</span>
                        </ShopPolicy>
                    </Content>
                </Root>
            )}
        </>
    );
};

export default Usernav;
