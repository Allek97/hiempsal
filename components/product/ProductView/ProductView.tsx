import { FC } from "react";
import Image from "next/image";

import { Product } from "@framework/types/product";

import { ProductSlider } from "..";

import {
    CartButton,
    CartContainer,
    ImageContainer,
    Root,
    SliderContainer,
} from "./ProductView.styled";

interface Props {
    product: Product;
}

const ProductView: FC<Props> = ({ product }) => {
    return (
        <Root>
            <SliderContainer>
                <ProductSlider>
                    {product.images
                        .filter((image, idx) => idx > -1)
                        .map((image, idx) => (
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

            <CartContainer>
                <div
                    className="relative w-full"
                    style={{
                        height: "calc(100% - 220px)",
                        borderRadius: "10px",
                        overflow: "hidden",
                    }}
                >
                    <Image
                        src="/images/tshirt-34.jpg"
                        alt="Thumbnail"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="top"
                        quality="85"
                        priority
                    />
                </div>
                <div>
                    <CartButton>Add to cart</CartButton>
                </div>
            </CartContainer>
        </Root>
    );
};

export default ProductView;
