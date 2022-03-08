import { FC } from "react";
import Image from "next/image";

import { Popup } from "@components/ui";

import {
    CartButton,
    Content,
    ImageVariantWrapper,
    VariantOptionContainer,
    ProductInfo,
    ProductPolicy,
    ProductVariantColor,
    ProductVariantList,
    VariantSizeGender,
    CartBtnWrapper,
} from "./ProductPopup.styled";

const ProductPopup: FC = () => {
    const maximumLength = (content: string, maxLength = 29): string => {
        const contentCut = content.substring(0, maxLength);

        if (content.length > maxLength) return `${contentCut}...`;
        return contentCut;
    };

    return (
        <Popup>
            <Content>
                <ProductInfo>
                    <h1>
                        {maximumLength("Lightweight Hoodie Fedoza IN Edition")}
                    </h1>
                    <span>$230</span>
                </ProductInfo>
                <VariantOptionContainer>
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
                </VariantOptionContainer>

                <VariantOptionContainer>
                    <h3>Select color</h3>
                    <ProductVariantList>
                        <VariantSizeGender>
                            <h2>XS</h2>
                        </VariantSizeGender>
                        <VariantSizeGender>
                            <h2>S</h2>
                        </VariantSizeGender>
                        <VariantSizeGender>
                            <h2>M</h2>
                        </VariantSizeGender>
                        <VariantSizeGender>
                            <h2>L</h2>
                        </VariantSizeGender>
                        <VariantSizeGender>
                            <h2>XL</h2>
                        </VariantSizeGender>
                        <VariantSizeGender isSelected>
                            <h2>XXL</h2>
                        </VariantSizeGender>
                    </ProductVariantList>
                </VariantOptionContainer>

                <VariantOptionContainer>
                    <h3>Select gender</h3>
                    <ProductVariantList>
                        <VariantSizeGender>
                            <h2>Man</h2>
                        </VariantSizeGender>
                        <VariantSizeGender>
                            <h2>Woman</h2>
                        </VariantSizeGender>
                        <VariantSizeGender isPride isSelected>
                            <h2>Genderqueer</h2>
                        </VariantSizeGender>
                        <VariantSizeGender isPride>
                            <h2>Non-Binary</h2>
                        </VariantSizeGender>
                    </ProductVariantList>
                </VariantOptionContainer>
            </Content>
            <ProductPolicy>
                <span>Delivery time: 5-7 business days</span>
                <span>100-day return period</span>
                <span>Free returns</span>
                <span>FREE SHIPPING FROM $50.00 CAD</span>
            </ProductPolicy>
            <CartBtnWrapper>
                <CartButton>Add To Cart</CartButton>
            </CartBtnWrapper>
        </Popup>
    );
};

export default ProductPopup;
