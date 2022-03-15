import { FC } from "react";
import Image from "next/image";

import { Popup } from "@components/ui";

import { Product } from "@framework/types/product";

import { getVariantImage } from "@components/product/helpers";

import { colorKeys, currencyKeys } from "@lib/option";

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

interface Props {
    product: Product;
}

const ProductPopup: FC<Props> = ({ product }) => {
    const maximumLength = (content: string, maxLength = 29): string => {
        const contentCut = content.substring(0, maxLength - 1);

        if (content.length > maxLength) return `${contentCut}...`;
        return contentCut;
    };

    return (
        <Popup>
            <Content>
                <ProductInfo>
                    <h1>{maximumLength(product.name)}</h1>
                    <span>
                        {currencyKeys[`${product.price.currencyCode}`]}
                        {product.price.value}
                    </span>
                </ProductInfo>
                <VariantOptionContainer>
                    <h3>Select color</h3>
                    <ProductVariantList>
                        {product.options
                            .find((option) =>
                                option.displayName
                                    .toLowerCase()
                                    .match(/colou?r/gi)
                            )
                            ?.values.map((value, idx) => {
                                const variantImg = getVariantImage(
                                    product,
                                    value.label
                                );
                                return (
                                    <ProductVariantColor
                                        isSelected={idx === 0}
                                        key={value.label}
                                    >
                                        <ImageVariantWrapper>
                                            <Image
                                                src={
                                                    variantImg?.url ??
                                                    "/product-pattern-bg.svg"
                                                }
                                                alt={
                                                    variantImg?.alt ??
                                                    "Item variant color"
                                                }
                                                width={3}
                                                height={5}
                                                layout="responsive"
                                                objectFit="contain"
                                                priority
                                            />
                                        </ImageVariantWrapper>
                                        <h2>{colorKeys[value.label]}</h2>
                                    </ProductVariantColor>
                                );
                            })}
                        {/* <ProductVariantColor isSelected>
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
                        </ProductVariantColor> */}
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
