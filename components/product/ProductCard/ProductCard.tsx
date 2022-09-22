import { FC, useState } from "react";
import Image from "next/image";

import { Product } from "@framework/types/product";

import { IoHeartDislikeSharp } from "react-icons/io5";
import { RiHeartAddFill } from "react-icons/ri";

import { ProductArticle } from "@components/common";
import { ErrorForm } from "@components/elements/FormInputsStyle";

import useWishlistInitial from "wishlist/wishlistInitialState";
import useAddWishlist from "@framework/wishlist/use-add-wishlist";
import useDeleteWishlist from "@framework/wishlist/use-delete-wishlist";

import {
    ProductBg,
    ProductFavorite,
    ProductImageWrapper,
    ProductName,
    ProductPrice,
    ProductTag,
    Root,
} from "./ProductCard.styled";

interface Props {
    product: Product;
    variant?: "slim" | "simple" | "complex";
    isDisplayed?: boolean;
}

const ProductCard: FC<Props> = ({
    product,
    variant = "simple",
    isDisplayed,
}) => {
    const { images, name, price } = product;
    const { url: thumbnailUrl, alt } = images[0];

    const { value: productPrice, currencyCode: currency } = price;

    const placeholderImage = "/product-image-placeholder.svg";
    const currencySymbol = currency === "EUR" ? "€" : "$";

    const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
    const [wishlistError, setWishlistError] = useState<string>("");

    useWishlistInitial({
        productId: product.id,
        setIsWishlisted,
        setWishlistError,
    });

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
        <>
            {variant === "slim" && (
                <>
                    <div className="absolute inset-0 z-20 flex items-center justify-center ">
                        <span className="bg-black text-white p-3 font-bold text-xl">
                            {product.name}
                        </span>
                    </div>
                    {product.images && (
                        <ProductImageWrapper>
                            <Image
                                alt={product.name ?? "Product image"}
                                src={product.images[0].url ?? placeholderImage}
                                height={320}
                                width={320}
                                layout="fixed"
                                placeholder="blur"
                                priority
                            />
                        </ProductImageWrapper>
                    )}
                </>
            )}

            {variant === "simple" && (
                <Root className="product-card" id="product-card">
                    <ProductBg />
                    <ProductTag>
                        <ProductName>
                            <span>{name}</span>
                        </ProductName>
                        <ProductPrice>
                            {`${currencySymbol}${productPrice} ${currency}`}
                        </ProductPrice>
                    </ProductTag>
                    {wishlistError && (
                        <ErrorForm className="ml-5">
                            <span className="mr-auto text-orange-red">
                                {wishlistError}
                            </span>
                        </ErrorForm>
                    )}
                    <ProductImageWrapper>
                        {product.images && (
                            <Image
                                src={thumbnailUrl ?? placeholderImage}
                                alt={alt ?? "Product image"}
                                height={540}
                                width={540}
                                layout="responsive"
                                objectFit="contain"
                                placeholder="blur"
                                priority
                            />
                        )}
                    </ProductImageWrapper>
                    <ProductFavorite
                        aria-label="Add to wishlist"
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
                    </ProductFavorite>
                </Root>
            )}

            {variant === "complex" && (
                <ProductArticle
                    product={product}
                    variant="product"
                    isDisplayed={isDisplayed}
                    layout="B"
                />
            )}
        </>
    );
};

ProductCard.defaultProps = {
    variant: "simple",
    isDisplayed: false,
};

export default ProductCard;
