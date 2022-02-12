import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdCardGiftcard } from "react-icons/md";
import { FaHeartBroken } from "react-icons/fa";
import { RiHeartAddLine } from "react-icons/ri";

import { ProductPopup } from "@components/common/ProductPopup";

import { useProductUI } from "@components/ui/productContext";

import { useMediaQueryNext } from "lib/customHooks";
import {
    AddToCartBtn,
    Root,
    ProductBonus,
    ProductImageWrapper,
    ProductInfo,
    Product,
    ProductBtn,
    ImageContainer,
} from "./ProductArticle.styled";

interface Props {
    variant: "product" | "wishlist" | "product-viewed";
    layout?: "A" | "B";
    onDisplay?: boolean;
}

const ProductArticle: FC<Props> = ({
    variant,
    layout = "A",
    onDisplay = false,
}) => {
    const [isAddedToWishlist, setIsAddedToWishlist] = useState<boolean>(false);

    const { isProductPopupOpen, openProductPopup } = useProductUI();

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
            {isProductPopupOpen && <ProductPopup />}
            <Product onDisplay={onDisplay}>
                <Link href="/" passHref>
                    <ImageContainer onDisplay={onDisplay}>
                        <ProductImageWrapper
                            imageSize={layout}
                            onDisplay={onDisplay}
                        >
                            <div>
                                <Image
                                    src="/images/Women-TShirt-Peach-Front.png"
                                    alt="Black hoodie"
                                    quality="80"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                        </ProductImageWrapper>
                    </ImageContainer>
                </Link>

                <ProductInfo textLayout={layout} onDisplay={onDisplay}>
                    <div className="flex items-start justify-between sm:items-center">
                        <div>
                            {isScreenLarge && (
                                <h6>
                                    All-rounder and breathable hoodie for every
                                    weather
                                </h6>
                            )}
                            <Link href="/" passHref>
                                <h3>Black radiant classic hoodie for men</h3>
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
                                <RiHeartAddLine />
                            ) : (
                                <FaHeartBroken />
                            )}
                        </ProductBtn>
                    </div>

                    <span>$300</span>

                    <ProductBonus>
                        <MdCardGiftcard />
                        <p>Winter Offer</p>
                    </ProductBonus>

                    {(variant === "wishlist" || variant === "product") && (
                        <AddToCartBtn
                            onClick={
                                variant === "wishlist"
                                    ? openProductPopup
                                    : // eslint-disable-next-line @typescript-eslint/no-empty-function
                                      () => {}
                            }
                        >
                            {variant === "wishlist"
                                ? "Add to Cart"
                                : "Get it now"}
                        </AddToCartBtn>
                    )}
                </ProductInfo>
            </Product>
        </Root>
    );
};

ProductArticle.defaultProps = {
    onDisplay: false,
    layout: "A",
};

export default ProductArticle;
