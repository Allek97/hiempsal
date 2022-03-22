import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdLocalOffer } from "react-icons/md";
import { FaHeartBroken } from "react-icons/fa";
import { RiHeartAddFill } from "react-icons/ri";

import { ProductPopup } from "@components/common";

import { useUI } from "@components/ui/context";

import { useMediaQueryNext } from "lib/customHooks";

import { Product } from "@framework/types/product";

import { Plus } from "@components/icons";

import {
    AddToCartBtn,
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
    variant: "product" | "wishlist" | "product-viewed";
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

    const { isProductPopupOpen, openProductPopup } = useUI();

    const isScreenLarge = useMediaQueryNext("lg");

    function addToWishlist() {
        if (isAddedToWishlist) {
            setIsAddedToWishlist(false);
            // console.log("Remove item from wish list");
        } else {
            setIsAddedToWishlist(true);
            // console.log("Add item to wish list");
        }
    }

    const manageProductAction = (): void => {
        switch (variant) {
            case "wishlist":
                alert("Remove Item");
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
            {isProductPopupOpen && <ProductPopup product={product} />}
            <ProductWrapper isDisplayed={isDisplayed}>
                <Link href={`/products/${slug}`} passHref>
                    <ImageContainer isDisplayed={isDisplayed}>
                        <ProductImageWrapper
                            imageSize={layout}
                            isDisplayed={isDisplayed}
                        >
                            <div>
                                <Image
                                    src={images[0].url ?? placeHolder}
                                    alt="Black hoodie"
                                    quality="80"
                                    layout="fill"
                                    objectFit="contain"
                                    priority
                                />
                            </div>
                        </ProductImageWrapper>
                    </ImageContainer>
                </Link>

                <ProductInfo textLayout={layout} isDisplayed={isDisplayed}>
                    <div className="flex items-start justify-between sm:items-center">
                        <div>
                            {isScreenLarge && (
                                <h6>
                                    All-rounder and breathable hoodie for every
                                    weather
                                </h6>
                            )}
                            <Link href="/" passHref>
                                <h3>{name}</h3>
                            </Link>
                        </div>

                        <ProductBtn
                            onClick={manageProductAction}
                            type="button"
                            isWishlist={variant === "wishlist"}
                            isAddedToWishlist={isAddedToWishlist}
                        >
                            {variant === "product" ||
                            variant === "product-viewed" ? (
                                <RiHeartAddFill />
                            ) : (
                                <FaHeartBroken />
                            )}
                        </ProductBtn>
                    </div>

                    <span>${price.value}</span>

                    <ProductBonus>
                        <MdLocalOffer />
                        <p>Winter Offer</p>
                    </ProductBonus>

                    {(variant === "wishlist" || variant === "product") &&
                        (variant === "wishlist" ? (
                            <AddToCartBtn
                                onClick={
                                    variant === "wishlist"
                                        ? openProductPopup
                                        : // eslint-disable-next-line @typescript-eslint/no-empty-function
                                          () => {}
                                }
                                isRippleActive={false}
                            >
                                Add To Cart
                            </AddToCartBtn>
                        ) : (
                            <QuickViewBtn
                                type="button"
                                onClick={openProductPopup}
                            >
                                <Plus /> <h5>Quick View</h5>
                            </QuickViewBtn>
                        ))}
                </ProductInfo>
            </ProductWrapper>
        </Root>
    );
};

ProductArticle.defaultProps = {
    isDisplayed: false,
    layout: "A",
};

export default ProductArticle;
