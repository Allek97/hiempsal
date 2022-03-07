import { FC } from "react";
import Image from "next/image";

import { FaRegHeart } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";

import { Product } from "@framework/types/product";

import { ethicalCertifications } from "@lib/const";

import { ProductSlider } from "..";

import {
    CartContainer,
    CertificationBox,
    FeatureContainer,
    ImageContainer,
    ProductInfo,
    ProductOverviewContainer,
    Root,
    SliderContainer,
    VariantButton,
    VariantContainer,
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
                    <ProductInfo>
                        <div>
                            <span>Clothing</span>
                            <span className="text-accents-7">
                                <RiArrowRightSLine />
                            </span>
                            <span>Hoodies</span>
                        </div>
                        <div>
                            <h1>Pro Protection Airbag 3.0</h1>
                            <h3>$150</h3>
                        </div>
                    </ProductInfo>

                    <CertificationBox>
                        <p>Using ethical ressources</p>
                        <ul className="flex">
                            {ethicalCertifications.map(
                                ({ id, link, title, website }) => (
                                    <li key={id}>
                                        <a
                                            href={website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={title}
                                        >
                                            <Image
                                                src={link}
                                                alt={title}
                                                layout="fixed"
                                                width={30}
                                                height={30}
                                                quality="85"
                                                priority
                                            />
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </CertificationBox>

                    <VariantContainer>
                        <VariantButton>Select Variant</VariantButton>
                        <WishlistBtn>
                            <FaRegHeart className="w-full h-full" />
                        </WishlistBtn>
                    </VariantContainer>
                </CartContainer>

                <FeatureContainer>
                    <div>
                        <Image
                            src="/images/testing.png"
                            alt="Thumbnail"
                            layout="responsive"
                            height={1}
                            width={1}
                            objectFit="contain"
                            quality="85"
                            priority
                        />
                    </div>

                    <div>
                        <Image
                            src="/images/Men-TShirt-Black-Side.png"
                            alt="Thumbnail"
                            layout="responsive"
                            height={1}
                            width={1}
                            objectFit="contain"
                            quality="85"
                            priority
                        />
                    </div>
                </FeatureContainer>
            </ProductOverviewContainer>
        </Root>
    );
};

export default ProductView;
