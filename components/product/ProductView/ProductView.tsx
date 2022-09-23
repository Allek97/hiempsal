import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { placeholderBlurUrl } from "@lib/placeholderBlurUrl";

import Link from "next/link";
import { useInView } from "react-intersection-observer";

import { RiArrowRightSLine, RiHeartAddFill } from "react-icons/ri";

import { Product } from "@framework/types/product";

import { useUI } from "@components/ui/context";

import { useMediaQueryNext, useScrollDirectionNext } from "@hooks";

import { currencyMap } from "@framework/utils/optionMapping";

import { ErrorForm } from "@components/elements/FormInputsStyle";
import { IoHeartDislikeSharp } from "react-icons/io5";

import useAddWishlist from "@framework/wishlist/use-add-wishlist";
import useDeleteWishlist from "@framework/wishlist/use-delete-wishlist";
import useWishlistInitial from "wishlist/wishlistInitialState";
import useAddViewed from "@framework/viewed/use-add-viewed";

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
import { ProductBoutique } from "../ProductBoutique";

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
    const addViewedProduct = useAddViewed();
    useEffect(() => {
        async function fetcher(): Promise<void> {
            try {
                if (product)
                    await addViewedProduct({
                        product,
                    });
            } catch (err) {
                console.log(err);
            }
        }

        fetcher();

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product]);

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

    const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
    const [wishlistError, setWishlistError] = useState<string>("");

    useWishlistInitial({
        productId: product.id,
        setIsWishlisted,
        setWishlistError,
    });

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

    const addWishlistProduct = useAddWishlist();
    const removeWishlistProduct = useDeleteWishlist();
    async function handleWishlist(): Promise<void> {
        try {
            setWishlistError("");
            if (isWishlisted) {
                await removeWishlistProduct({
                    productId: product.id,
                });
                setIsWishlisted(false);
            } else {
                await addWishlistProduct({
                    product: product,
                });
                setIsWishlisted(true);
            }
        } catch (err) {
            if (err instanceof Error)
                setWishlistError(
                    "Server error after adding product to the wishlist. Please try again"
                );
        }
    }

    return (
        <Root>
            {isPopupOpen && (
                <ProductCart product={product} key="product-cart" />
            )}

            <ProductOverviewContainer>
                <SliderContainer>
                    <ProductSlider key={product.id}>
                        {product.images.map((image) => (
                            <ImageContainer key={image.url}>
                                <Image
                                    placeholder="blur"
                                    blurDataURL={placeholderBlurUrl}
                                    src={image.url}
                                    alt={image.alt || `${product.name} Image`}
                                    layout="fill"
                                    objectFit="contain"
                                    priority
                                    key={image.url}
                                />
                            </ImageContainer>
                        ))}
                    </ProductSlider>
                </SliderContainer>

                <CartContainer>
                    <ProductInfo>
                        <div>
                            <Link href="/products/lightweight-hoodie" passHref>
                                <span>{product.vendor}</span>
                            </Link>
                            <span className="text-accents-8">
                                <RiArrowRightSLine />
                            </span>
                            <Link href="/clothing" passHref>
                                <span>{product.type}</span>
                            </Link>
                            <span className="text-accents-8">
                                <RiArrowRightSLine />
                            </span>
                            <Link href="/products/lightweight-hoodie" passHref>
                                <span>{product.name}</span>
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
                    <div className="flex justify-between">
                        <Certification />
                        {wishlistError && (
                            <ErrorForm className="ml-5">
                                <span className="mr-auto text-orange-red">
                                    {wishlistError}
                                </span>
                            </ErrorForm>
                        )}
                    </div>

                    <VariantContainer ref={ref}>
                        <VariantButtonPopup />

                        <WishlistBtn
                            type="button"
                            onClick={() => handleWishlist()}
                        >
                            {isWishlisted ? (
                                <IoHeartDislikeSharp
                                    className="w-full h-full"
                                    style={{
                                        fill: "var(--orange-red)",
                                    }}
                                />
                            ) : (
                                <RiHeartAddFill className="w-full h-full" />
                            )}
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
                                placeholder="blur"
                                blurDataURL={placeholderBlurUrl}
                                src={featureImage.url}
                                alt={featureImage.alt || "feature"}
                                layout="fill"
                                objectFit="fill"
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
            <ProductSimilar
                productImage={product.images[1]}
                productType={product.type}
                product={product}
            />
            <ProductBoutique productType={product.type} product={product} />
        </Root>
    );
};

export default ProductView;
