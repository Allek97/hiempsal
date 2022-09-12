import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdLocalOffer } from "react-icons/md";
import { FaHeartBroken } from "react-icons/fa";
import { RiHeartAddFill } from "react-icons/ri";

import { useUI } from "@components/ui/context";
import { FunctionalLink } from "@components/utils";

import { Product, ProductImage } from "@framework/types/product";

import { Media } from "@lib/media";
import { Plus } from "@components/icons";
import { ImageVisualizer } from "@components/elements";
import useDeleteWishlist from "@framework/wishlist/use-delete-wishlist";

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
    const { name, slug, images, price } = product;

    const placeHolder = "/product-image-placeholder.svg";

    const [isAddedToWishlist, setIsAddedToWishlist] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<ProductImage>(images[0]);

    const { openPopup } = useUI();

    const removeWishlistProduct = useDeleteWishlist();

    function addToWishlist() {
        if (isAddedToWishlist) {
            setIsAddedToWishlist(false);
            // console.log("Remove item from wish list");
        } else {
            setIsAddedToWishlist(true);
            // console.log("Add item to wish list");
        }
    }

    const manageProductAction = async (): Promise<void> => {
        switch (variant) {
            case "wishlist":
                await removeWishlistProduct({
                    slug: slug,
                });
                break;
            case "product":
            case "product-viewed":
                addToWishlist();
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
                                            src={
                                                selectedImage.url ?? placeHolder
                                            }
                                            alt="Black hoodie"
                                            quality="80"
                                            layout="fill"
                                            objectFit="contain"
                                            priority
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
                                        product={product}
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
                                        isWishlist={variant === "wishlist"}
                                        isAddedToWishlist={isAddedToWishlist}
                                    >
                                        {variant !== "wishlist" ? (
                                            <RiHeartAddFill />
                                        ) : (
                                            <FaHeartBroken />
                                        )}
                                    </ProductBtn>
                                </div>
                                <Media greaterThanOrEqual="lg">
                                    <h6>
                                        All-rounder and breathable hoodie for
                                        every weather
                                    </h6>
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
                            <p>Summer Offer</p>
                        </ProductBonus>

                        <Link href={`/products${product.path}`} passHref>
                            <FunctionalLink>
                                <QuickViewBtn type="button" onClick={openPopup}>
                                    <Plus /> <h5>Visit Product</h5>
                                </QuickViewBtn>
                            </FunctionalLink>
                        </Link>
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
