import { FC } from "react";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";

import { Product } from "@framework/types/product";

import { ethicalCertifications } from "@lib/const";

import { ProductSlider } from "..";

import {
    CartButton,
    CartContainer,
    CertificationBox,
    ImageContainer,
    ProductOverviewContainer,
    Root,
    SliderContainer,
    WishlistBtn,
} from "./ProductView.styled";

interface Props {
    product: Product;
}

const ProductView: FC<Props> = ({ product }) => {
    return (
        <Root>
            <ProductOverviewContainer>
                <SliderContainer>
                    <ProductSlider>
                        {product.images
                            .filter((image, idx) => idx > -1)
                            .map((image, idx) => (
                                <ImageContainer key={image.url}>
                                    <Image
                                        src={image.url}
                                        alt={
                                            image.alt || `${product.name} Image`
                                        }
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
                    <div className="flex justify-between items-center w-full mt-28">
                        <CertificationBox>
                            {ethicalCertifications.map(
                                ({ id, link, title }) => (
                                    <div key={id}>
                                        <Image
                                            src={link}
                                            alt={title}
                                            layout="fixed"
                                            width={30}
                                            height={30}
                                            quality="85"
                                            priority
                                        />
                                    </div>
                                )
                            )}
                        </CertificationBox>

                        <div className="flex">
                            <CartButton>Add to cart</CartButton>
                            <WishlistBtn>
                                <FaRegHeart className="w-full h-full" />
                            </WishlistBtn>
                        </div>
                    </div>
                </CartContainer>
            </ProductOverviewContainer>
        </Root>
    );
};

export default ProductView;
