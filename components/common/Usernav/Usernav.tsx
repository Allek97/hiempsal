import { FC, MutableRefObject, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    clearAllBodyScrollLocks,
    disableBodyScroll,
    enableBodyScroll,
} from "body-scroll-lock";
import { HiArrowNarrowRight } from "react-icons/hi";

import { useUI } from "@components/ui/context";

import {
    Article,
    Container,
    Content,
    ImageContainer,
    NavBtn,
    Navigation,
    ProductDetails,
    Root,
    Separator,
} from "./Usernav.styled";

const Usernav: FC = () => {
    const ref = useRef() as MutableRefObject<HTMLDivElement>;
    const {
        isCartOpen,
        isWishListOpen,
        isViewedProductsOpen,
        openCart,
        openWishList,
        openViewedProducts,
    } = useUI();

    const isUsernavOpen = isCartOpen || isWishListOpen || isViewedProductsOpen;

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
                            <Article>
                                <Link href="/" passHref>
                                    <ImageContainer>
                                        <Image
                                            src="/images/Men-Hoodie-Black-Front.png"
                                            alt="Black hoodie"
                                            width={2}
                                            height={3}
                                            quality="100"
                                            layout="responsive"
                                            objectFit="contain"
                                        />
                                    </ImageContainer>
                                </Link>

                                <ProductDetails>
                                    <div>
                                        <h1>Black Hoodie Men</h1>
                                        <p>Black M</p>
                                    </div>
                                    <span>CAD150$</span>
                                    <div>Remove</div>
                                </ProductDetails>
                            </Article>
                        </Content>
                    </Container>
                </Root>
            )}
        </>
    );
};

export default Usernav;
