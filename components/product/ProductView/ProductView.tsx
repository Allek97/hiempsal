import { FC } from "react";
import Image from "next/image";

import { Product } from "@framework/types/product";
import { ImageContainer, Root, SliderContainer } from "./ProductView.styled";
import { ProductSlider } from "..";

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
                                width={600}
                                height={600}
                                quality="85"
                                priority={idx === 0}
                            />
                        </ImageContainer>
                    ))}
                </ProductSlider>
            </SliderContainer>
        </Root>
    );
};

export default ProductView;
