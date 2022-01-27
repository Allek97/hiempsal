import { FC } from "react";
import Image from "next/image";

import { useProductUI } from "@components/ui/productContext";
import { useMediaQueryNext } from "lib/customHooks";

import Close from "@components/icons/Close";

import {
    CartButton,
    CloseWrapper,
    Container,
    Content,
    ImageVariantWrapper,
    Overlay,
    ProductColor,
    ProductInfo,
    ProductPolicy,
    ProductSize,
    ProductVariantColor,
    ProductVariantList,
    ProductVariantSize,
    Root,
} from "./ProductPopup.styled";

const ProductPopup: FC = () => {
    const { closeProductPopup } = useProductUI();

    const maximumLength = (content: string, maxLength = 29): string => {
        const contentCut = content.substring(0, maxLength);

        if (content.length > maxLength) return `${contentCut}...`;
        return contentCut;
    };

    const isScreenLarge = useMediaQueryNext("lg");

    return (
        <Root>
            <Overlay onClick={closeProductPopup} />
            <Container>
                {isScreenLarge && (
                    <CloseWrapper onClick={closeProductPopup}>
                        <Close />
                    </CloseWrapper>
                )}

                <Content>
                    <ProductInfo>
                        <h1>
                            {maximumLength(
                                "Lightweight Hoodie Fedoza IN Edition"
                            )}
                        </h1>
                        <span>$230</span>
                    </ProductInfo>
                    <ProductColor>
                        <h3>Select color</h3>
                        <ProductVariantList>
                            <ProductVariantColor isSelected>
                                <ImageVariantWrapper>
                                    <Image
                                        src="/images/Men-Hoodie-White-Front.png"
                                        alt="Item variant color"
                                        width={3}
                                        height={5}
                                        layout="responsive"
                                        objectFit="contain"
                                    />
                                </ImageVariantWrapper>
                                <h2>Marine Black Camo</h2>
                            </ProductVariantColor>
                            <ProductVariantColor>
                                <ImageVariantWrapper>
                                    <Image
                                        src="/images/Men-Hoodie-Black-Front.png"
                                        alt="Item variant color"
                                        width={3}
                                        height={5}
                                        layout="responsive"
                                        objectFit="contain"
                                    />
                                </ImageVariantWrapper>
                                <h2>Radiant Black</h2>
                            </ProductVariantColor>
                            <ProductVariantColor>
                                <ImageVariantWrapper>
                                    <Image
                                        src="/images/Men-Sweatshirt-Red-Front.png"
                                        alt="Item variant color"
                                        width={3}
                                        height={5}
                                        layout="responsive"
                                        objectFit="contain"
                                    />
                                </ImageVariantWrapper>
                                <h2>Red Satiant</h2>
                            </ProductVariantColor>
                            <ProductVariantColor>
                                <ImageVariantWrapper>
                                    <Image
                                        src="/images/Men-Hoodie-Black-Front.png"
                                        alt="Item variant color"
                                        width={3}
                                        height={5}
                                        layout="responsive"
                                        objectFit="contain"
                                    />
                                </ImageVariantWrapper>
                                <h2>Yellow Green Space</h2>
                            </ProductVariantColor>
                            <ProductVariantColor>
                                <ImageVariantWrapper>
                                    <Image
                                        src="/images/Men-Hoodie-Black-Front.png"
                                        alt="Item variant color"
                                        width={3}
                                        height={5}
                                        layout="responsive"
                                        objectFit="contain"
                                    />
                                </ImageVariantWrapper>
                                <h2>Azoul</h2>
                            </ProductVariantColor>
                        </ProductVariantList>
                    </ProductColor>

                    <ProductSize>
                        <h3>Select color</h3>
                        <ProductVariantList>
                            <ProductVariantSize>
                                <h2>XS</h2>
                            </ProductVariantSize>
                            <ProductVariantSize>
                                <h2>S</h2>
                            </ProductVariantSize>
                            <ProductVariantSize isSelected>
                                <h2>M</h2>
                            </ProductVariantSize>
                            <ProductVariantSize>
                                <h2>L</h2>
                            </ProductVariantSize>
                            <ProductVariantSize>
                                <h2>XL</h2>
                            </ProductVariantSize>
                            <ProductVariantSize>
                                <h2>XXL</h2>
                            </ProductVariantSize>
                        </ProductVariantList>
                    </ProductSize>
                </Content>
                <ProductPolicy>
                    <span>Delivery time: 5-7 business days</span>
                    <span>100-day return period</span>
                    <span>Free returns</span>
                    <span>FREE SHIPPING FROM $50.00 CAD</span>
                </ProductPolicy>
                <CartButton>Add To Cart</CartButton>
            </Container>
        </Root>
    );
};

export default ProductPopup;
