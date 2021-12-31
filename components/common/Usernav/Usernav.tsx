import { FC, MutableRefObject, useEffect, useRef } from "react";
import {
    clearAllBodyScrollLocks,
    disableBodyScroll,
    enableBodyScroll,
} from "body-scroll-lock";
import { HiArrowNarrowRight } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

import { Cart } from "@components/cart";

import { useUI } from "@components/ui/context";
import { useMediaQueryNext } from "lib/customHooks";

import {
    Container,
    Content,
    NavBtn,
    Navigation,
    Root,
    Separator,
} from "./Usernav.styled";

const Usernav: FC = () => {
    const ref = useRef() as MutableRefObject<HTMLDivElement>;

    const isDesktop = useMediaQueryNext("lg");

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
    } = useUI();

    useEffect(() => {
        if (ref.current) {
            setUsernavScrollStatus(0);
            if (isUsernavOpen) disableBodyScroll(ref.current);
            else enableBodyScroll(ref.current);
        }
        return () => {
            clearAllBodyScrollLocks();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUsernavOpen]);

    const listenScrollEvent = () => {
        if (ref.current) {
            setUsernavScrollStatus(ref.current.scrollTop);
        }
    };

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {isUsernavOpen && (
                <Root ref={ref} onScroll={listenScrollEvent}>
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
                                {isDesktop && (
                                    <NavBtn
                                        type="button"
                                        aria-label="Close Usernav"
                                        onClick={closeUsernav}
                                        isSelected={false}
                                    >
                                        <IoClose />
                                        <h1>Close</h1>
                                    </NavBtn>
                                )}
                            </nav>
                            {!isDesktop && <Separator />}
                        </Navigation>

                        <Content>
                            <Cart />
                        </Content>
                    </Container>
                </Root>
            )}
        </>
    );
};

export default Usernav;
