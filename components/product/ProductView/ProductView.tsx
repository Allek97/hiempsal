import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { FaRegHeart } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";

import { Product } from "@framework/types/product";
import { ProductPopup } from "@components/common/ProductPopup";
import { useProductUI } from "@components/ui/productContext";

import { ethicalCertifications } from "@lib/const";
import { currencyKeys } from "@lib/option";

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
    const { openProductPopup } = useProductUI();
    return (
        <Root>
            <ProductPopup product={product} />
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
                            <Link href="/clothing" passHref>
                                <span>Clothing</span>
                            </Link>

                            <span className="text-accents-8">
                                <RiArrowRightSLine />
                            </span>
                            <Link href="/products/lightweight-hoodie" passHref>
                                <span>Hoodies</span>
                            </Link>
                        </div>
                        <div>
                            <h1>{product.name}</h1>
                            <h3>
                                {currencyKeys[`${product.price.currencyCode}`]}
                                {product.price.value}
                            </h3>
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
                        <VariantButton onClick={openProductPopup}>
                            Select Variant
                        </VariantButton>
                        <WishlistBtn>
                            <FaRegHeart className="w-full h-full" />
                        </WishlistBtn>
                    </VariantContainer>
                </CartContainer>

                <FeatureContainer isFirst>
                    <div>
                        <Image
                            src="/images/testing.png"
                            alt="Thumbnail"
                            layout="fill"
                            objectFit="contain"
                            quality="85"
                            priority
                        />
                    </div>
                </FeatureContainer>

                <FeatureContainer>
                    <div>
                        <Image
                            src="/images/Men-TShirt-Black-Side.png"
                            alt="Thumbnail"
                            layout="fill"
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
