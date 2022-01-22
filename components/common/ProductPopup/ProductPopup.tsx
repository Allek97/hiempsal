import { FC } from "react";
import Image from "next/image";
import {
    Container,
    Content,
    ImageVariantWrapper,
    Overlay,
    ProductColor,
    ProductInfo,
    ProductSize,
    ProductVariantColor,
    ProductVariantList,
    ProductVariantSize,
    Root,
} from "./ProductPopup.styled";

const ProductPopup: FC = () => {
    const maximumLength = (content: string, maxLength = 30): string => {
        const contentCut = content.substring(0, maxLength);

        if (content.length > maxLength) return `${contentCut}...`;
        return contentCut;
    };

    return (
        <Root>
            <Overlay />
            <Container>
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
                            <ProductVariantSize isSelected>
                                <h2>S</h2>
                            </ProductVariantSize>
                        </ProductVariantList>
                    </ProductSize>
                </Content>
                <h1>hey</h1>
            </Container>
        </Root>
    );
};

export default ProductPopup;
