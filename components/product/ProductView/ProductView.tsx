import { FC, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

import { FaRegHeart } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";

import { Product } from "@framework/types/product";

import { useUI } from "@components/ui/context";

import { useScrollDirectionNext } from "@lib/customHooks";
import { ethicalCertifications } from "@lib/const";
import { currencyMap } from "@framework/utils/optionMapping";

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
import ProductCart from "../ProductCart/ProductCart";

interface Props {
    product: Product;
}

const ProductView: FC<Props> = ({ product }) => {
    const {
        isPopupOpen,
        isProductCartOpen,
        isProductAdded,
        openPopup,
        closePopup,
        openProductCart,
    } = useUI();
    const { direction } = useScrollDirectionNext();
    const { ref, inView, entry } = useInView({ threshold: 1 });

    const isProductOverviewOpen = useMemo(
        () =>
            direction === "down" &&
            !inView &&
            (entry?.boundingClientRect.y ?? 0) < 0,
        [direction, inView, entry?.boundingClientRect.y]
    );

    useEffect(() => {
        if (!isProductCartOpen && !isProductAdded) {
            if (isProductOverviewOpen) openPopup();
            else closePopup();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isProductOverviewOpen, isPopupOpen, isProductCartOpen, isProductAdded]);

    return (
        <Root>
            {isPopupOpen && (
                <ProductCart
                    product={product}
                    isProductOverviewOpen={isProductOverviewOpen}
                />
            )}
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
                                {currencyMap[`${product.price.currencyCode}`]}
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
                        <VariantButton
                            onClick={() => {
                                openPopup();
                                openProductCart();
                            }}
                        >
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
        </Root>
    );
};

export default ProductView;
