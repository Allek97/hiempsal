import { FC, MutableRefObject, useEffect, useRef } from "react";

import { HiArrowNarrowRight } from "react-icons/hi";
import { VscEyeClosed } from "react-icons/vsc";

import { Cart } from "@components/cart";
import { Wishlist } from "@components/wishlist";
import { ViewedProduct } from "@components/viewedProduct";

import { useUsernavUI } from "@components/ui/usernavContext";
import { useMediaQueryNext } from "lib/customHooks";

import { HelpCard } from "../HelpCard";

import { Container, Content, NavBtn, Navigation, Root } from "./Usernav.styled";

const Usernav: FC = () => {
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
            {isUsernavOpen && (
                <Root ref={rootRef} onScroll={listenScrollEvent}>
                    <Container>
                        <Navigation>
                            <nav>
                                <NavBtn
                                    type="button"
                                    aria-label="Cart"
                                    onClick={openCart}
                                    isSelected={isCartOpen}
                                >
                                    <HiArrowNarrowRight />
                                    <h1>Your Cart</h1>
                                </NavBtn>
                                <NavBtn
                                    type="button"
                                    aria-label="Wish list"
                                    onClick={openWishList}
                                    isSelected={isWishListOpen}
                                >
                                    <HiArrowNarrowRight />
                                    <h1>Wish list</h1>
                                </NavBtn>
                                <NavBtn
                                    type="button"
                                    aria-label="Viewed products"
                                    onClick={openViewedProducts}
                                    isSelected={isViewedProductsOpen}
                                >
                                    <HiArrowNarrowRight />
                                    <h1>Viewed products</h1>
                                </NavBtn>
                                {isScreenLarge && (
                                    <NavBtn
                                        type="button"
                                        aria-label="Close Usernav"
                                        onClick={closeUsernav}
                                        isSelected={false}
                                    >
                                        <VscEyeClosed />
                                        <h1>Close</h1>
                                    </NavBtn>
                                )}
                            </nav>

                            {isScreenLarge && (
                                <div className="fixed bottom-16">
                                    <HelpCard />
                                </div>
                            )}
                        </Navigation>

                        <Content ref={contentRef} onScroll={listenScrollEvent}>
                            {isCartOpen && <Cart />}
                            {/* {isWishListOpen && <Wishlist />}
                            {isViewedProductsOpen && <ViewedProduct />} */}
                        </Content>
                    </Container>
                </Root>
            )}
        </>
    );
};

export default Usernav;
