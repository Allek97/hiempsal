import { FC, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

import { FaRegHeart } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";

import { Product } from "@framework/types/product";

import { useUI } from "@components/ui/context";
import { ReviewProvider } from "@components/review";

import { useMediaQueryNext, useScrollDirectionNext } from "@hooks";

import { currencyMap } from "@framework/utils/optionMapping";

import {
    ProductSlider,
    Certification,
    ProductDescription,
    ProductInformation,
} from "..";

import {
    CartContainer,
    FeatureContainer,
    ImageContainer,
    ProductDetailsBox,
    ProductInfo,
    ProductOverviewContainer,
    Root,
    SliderContainer,
    VariantButton,
    VariantContainer,
    WishlistBtn,
} from "./ProductView.styled";
import ProductCart from "../ProductCart/ProductCart";
import { useProduct } from "../context";
import { ProductSimilar } from "../ProductSimilar";

interface Props {
    product: Product;
}

export const VariantButtonPopup = () => {
    const { openPopup, openProductCart } = useUI();

    return (
        <VariantButton
            onClick={() => {
                openPopup();
                openProductCart();
            }}
        >
            Select Variant
        </VariantButton>
    );
};

const ProductView: FC<Props> = ({ product }) => {
    const {
        isPopupOpen,
        isProductCartOpen,
        isProductAdded,
        isHelpOpen,
        isReviewOpen,
        openPopup,
        closePopup,
    } = useUI();

    const {
        setProductOverview,
        setProductId,
        setProductType,
        isProductOverviewOpen,
        isProductInfoOpen,
    } = useProduct();

    useEffect(() => {
        setProductId(product.id);
        setProductType(product.type);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product.id, product.type]);

    const { direction } = useScrollDirectionNext();
    const { ref, inView, entry } = useInView({
        threshold: 1,
        triggerOnce: false,
    });

    const isScreenLarge = useMediaQueryNext("lg");

    useEffect(() => {
        const condition =
            (isScreenLarge ? true : direction === "down") &&
            !inView &&
            (entry?.boundingClientRect.y ?? 0) < 0;

        setProductOverview(condition);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        direction,
        entry?.boundingClientRect.y,
        inView,
        isScreenLarge,
        isProductInfoOpen,
    ]);

    // NOTE: Used to interact with <MobileNav />
    useEffect(() => {
        if (!isProductCartOpen && !isProductAdded) {
            if (
                isProductOverviewOpen ||
                isProductInfoOpen ||
                isHelpOpen ||
                isReviewOpen
            )
                openPopup();
            else closePopup();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isProductOverviewOpen, isProductCartOpen, isProductAdded]);

    return (
        <Root>
            <ReviewProvider>
                {isPopupOpen && (
                    <ProductCart product={product} key="product-cart" />
                )}
            </ReviewProvider>

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

                    <Certification />

                    <VariantContainer ref={ref}>
                        <VariantButtonPopup />

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
            <ProductDetailsBox>
                <ProductDescription
                    description={product.description}
                    featureName={product.featureName}
                />

                <ProductInformation
                    hasDimensions={!!product.dimensions}
                    hasFeatures={!!product.features}
                    hasMaterials={!!product.materials}
                    hasShipping={!!product.shipping}
                    hasSustainability={!!product.sustainability}
                />
            </ProductDetailsBox>
            <ProductSimilar product={product} />
        </Root>
    );
};

export default ProductView;
