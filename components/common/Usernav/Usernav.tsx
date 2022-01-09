import { FC, MutableRefObject, useEffect, useRef } from "react";
import Image from "next/image";
import {
    clearAllBodyScrollLocks,
    disableBodyScroll,
    enableBodyScroll,
} from "body-scroll-lock";

import { HiArrowNarrowRight } from "react-icons/hi";
import { VscEyeClosed } from "react-icons/vsc";

import { Cart } from "@components/cart";

import { useUI } from "@components/ui/context";
import { useMediaQueryNext } from "lib/customHooks";

import {
    Container,
    Content,
    HelpCard,
    HelpCardImage,
    NavBtn,
    Navigation,
    Root,
} from "./Usernav.styled";

const Usernav: FC = () => {
    const ref = useRef() as MutableRefObject<HTMLDivElement>;

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
                                <button type="button">
                                    <HelpCard>
                                        <HelpCardImage>
                                            <Image
                                                alt="Help agent"
                                                src="/images/agent.jpg"
                                                quality="80"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </HelpCardImage>

                                        <div>
                                            <span>Get help</span>
                                            <span>Online now</span>
                                        </div>
                                    </HelpCard>
                                </button>
                            )}
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
