import { FC } from "react";
import Image from "next/image";

import { Product } from "@framework/types/product";

import { ProductSlider } from "..";

import { ImageContainer, Root, SliderContainer } from "./ProductView.styled";

interface Props {
    product: Product;
}

const ProductView: FC<Props> = ({ product }) => {
    return (
        <Root>
            <SliderContainer>
                <ProductSlider>
                    {product.images.map((image, idx) => (
                        <ImageContainer key={image.url}>
                            <Image
                                src={image.url}
                                alt={image.alt || `${product.name} Image`}
                                layout="fill"
                                objectFit="contain"
                                quality="85"
                                priority={idx === 0}
                                key={image.url}
                            />
                        </ImageContainer>
                    ))}
                </ProductSlider>
            </SliderContainer>
        </Root>
    );
};

export default ProductView;
