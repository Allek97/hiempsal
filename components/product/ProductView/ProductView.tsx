import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

import { FaRegHeart } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";

import { Product } from "@framework/types/product";

import { useUI } from "@components/ui/context";

import { useScrollDirectionNext } from "@lib/customHooks";
import { ethicalCertifications } from "@lib/const";
import { currencyKeys } from "@lib/option";

import { ProductPopup } from "@components/common";
import { ProductSlider, ProductSticky } from "..";

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
    const { openProductPopup } = useUI();
    const { direction } = useScrollDirectionNext();
    const { ref, inView, entry } = useInView({ threshold: 1 });

    return (
        <Root>
            <ProductPopup product={product} />
            <ProductOverviewContainer>
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

                    <VariantContainer ref={ref}>
                        <VariantButton onClick={openProductPopup}>
                            Select Variant
                        </VariantButton>
                        <WishlistBtn>
                            <FaRegHeart className="w-full h-full" />
                        </WishlistBtn>
                    </VariantContainer>
                </CartContainer>

                {product.featureImages.map((featureImage, idx) => (
                    <FeatureContainer
                        isFirst={idx === 0}
                        // eslint-disable-next-line react/no-array-index-key
                        key={`${featureImage.url}${idx}`}
                    >
                        <div>
                            <Image
                                src={featureImage.url}
                                alt={featureImage.alt || "feature"}
                                layout="fill"
                                objectFit="cover"
                                quality="85"
                                priority
                            />
                        </div>
                    </FeatureContainer>
                ))}
            </ProductOverviewContainer>
            {/* Component appears only when Select Varaint button is out of the viewport with a 100% threshold  */}
            {direction === "down" &&
                !inView &&
                (entry?.boundingClientRect.y ?? 0) < 0 && <ProductSticky />}
        </Root>
    );
};

export default ProductView;
