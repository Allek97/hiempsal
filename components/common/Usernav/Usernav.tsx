import { FC, MutableRefObject, useEffect, useRef } from "react";
import {
    clearAllBodyScrollLocks,
    disableBodyScroll,
    enableBodyScroll,
} from "body-scroll-lock";
import { HiArrowNarrowRight } from "react-icons/hi";

import { Cart } from "@components/cart";

import { useUI } from "@components/ui/context";

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
    const {
        isUsernavOpen,
        isCartOpen,
        isWishListOpen,
        isViewedProductsOpen,
        openCart,
        openWishList,
        openViewedProducts,
    } = useUI();

    useEffect(() => {
        if (ref.current) {
            if (isUsernavOpen) disableBodyScroll(ref.current);
            else enableBodyScroll(ref.current);
        }
        return () => {
            clearAllBodyScrollLocks();
        };
    }, [isUsernavOpen]);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {isUsernavOpen && (
                <Root ref={ref}>
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
                            </nav>
                            <Separator />
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
