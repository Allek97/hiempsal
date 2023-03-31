/* eslint-disable no-nested-ternary */
import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { placeholderBlurUrl } from "@lib/placeholderBlurUrl";

import { MdLocalOffer } from "react-icons/md";
import { ImHeartBroken } from "react-icons/im";
import { RiHeartAddFill } from "react-icons/ri";

import { useUI } from "@components/ui/context";
import { FunctionalLink } from "@components/utils";

import { Product, ProductImage } from "@framework/types/product";

import { Media } from "@lib/media";
import { Plus } from "@components/icons";
import { ImageVisualizer } from "@components/elements";
import useDeleteWishlist from "@framework/wishlist/use-delete-wishlist";
import useAddWishlist from "@framework/wishlist/use-add-wishlist";
import { IoHeartDislikeSharp } from "react-icons/io5";
import { ErrorForm } from "@components/elements/FormInputsStyle";
import useWishlistInitial from "../../../wishlist/wishlistInitialState";

import {
    Root,
    ProductBonus,
    ProductImageWrapper,
    ProductInfo,
    ProductWrapper,
    ProductBtn,
    ImageContainer,
    QuickViewBtn,
} from "./ProductArticle.styled";

interface Props {
    product: Product;
    variant: "product" | "wishlist" | "product-viewed" | "order";
    layout?: "A" | "B";
    isDisplayed?: boolean;
}

const ProductArticle: FC<Props> = ({
    product,
    variant,
    layout = "A",
    isDisplayed = false,
}) => {
    const { id, name, slug, images, price } = product;

    const placeHolder = "/product-image-placeholder.svg";

    const [selectedImage, setSelectedImage] = useState<ProductImage>(images[0]);

    const { openPopup } = useUI();

    const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
    const [wishlistError, setWishlistError] = useState<string>("");

    useWishlistInitial({
        productId: id,
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

    const manageProductAction = async (): Promise<void> => {
        switch (variant) {
            case "wishlist":
                await removeWishlistProduct({
                    productId: id,
                });
                break;
            case "product":
            case "product-viewed":
                await handleWishlist();
                break;

            default:
                break;
        }
    };

    return (
        <Root>
            {product && (
                <ProductWrapper isDisplayed={isDisplayed}>
                    <Link href={`/products/${slug}`} passHref>
                        <FunctionalLink>
                            <ImageContainer
                                isDisplayed={isDisplayed}
                                isOrder={variant === "order"}
                            >
                                <ProductImageWrapper
                                    imageSize={layout}
                                    isDisplayed={isDisplayed}
                                >
                                    <div>
                                        <Image
                                            placeholder="blur"
                                            blurDataURL={placeholderBlurUrl}
                                            src={
                                                selectedImage.url ?? placeHolder
                                            }
                                            alt={
                                                selectedImage.alt ??
                                                "product article"
                                            }
                                            layout="fill"
                                            objectFit="contain"
                                            priority
                                            quality={60}
                                        />
                                    </div>
                                </ProductImageWrapper>
                            </ImageContainer>
                        </FunctionalLink>
                    </Link>

                    <ProductInfo textLayout={layout} isDisplayed={isDisplayed}>
                        <div className="flex items-start justify-between w-full sm:items-center">
                            <div className="w-full">
                                <div className="flex">
                                    <ImageVisualizer
                                        variantImages={product.variantImages!}
                                        thumbnail={product.images[0]}
                                        selectedImage={selectedImage}
                                        setSelectedImage={setSelectedImage}
                                        variant={
                                            variant === "product"
                                                ? "product"
                                                : "userlist"
                                        }
                                    />
                                    <ProductBtn
                                        onClick={manageProductAction}
                                        type="button"
                                        isProduct={variant === "product"}
                                    >
                                        {variant === "wishlist" ? (
                                            <ImHeartBroken
                                                className="w-full h-full"
                                                style={{
                                                    fill: "var(--orange-red)",
                                                }}
                                            />
                                        ) : isWishlisted ? (
                                            <IoHeartDislikeSharp
                                                className="w-full h-full"
                                                style={{
                                                    fill: "var(--orange-red)",
                                                }}
                                            />
                                        ) : (
                                            <RiHeartAddFill className="w-full h-full" />
                                        )}
                                    </ProductBtn>
                                </div>
                                <Media greaterThanOrEqual="lg">
                                    <h6>{product.featureName}</h6>
                                </Media>

                                <Link href={`/products/${slug}`} passHref>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a>
                                        <h3>{name}</h3>
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <span>${price.value}</span>

                        <ProductBonus>
                            <MdLocalOffer />
                            <p>{product.vendor} boutique special</p>
                        </ProductBonus>

                        <Link href={`/products${product.path}`} passHref>
                            <FunctionalLink>
                                <QuickViewBtn type="button" onClick={openPopup}>
                                    <Plus /> <h5>Visit Product</h5>
                                </QuickViewBtn>
                            </FunctionalLink>
                        </Link>
                        {!wishlistError && (
                            <ErrorForm className="ml-5">
                                <span className="mr-auto text-orange-red">
                                    {wishlistError}
                                </span>
                            </ErrorForm>
                        )}
                    </ProductInfo>
                </ProductWrapper>
            )}
        </Root>
    );
};

ProductArticle.defaultProps = {
    isDisplayed: false,
    layout: "A",
};

export default ProductArticle;
