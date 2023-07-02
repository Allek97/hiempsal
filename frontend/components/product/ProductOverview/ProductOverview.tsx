/* eslint-disable react/require-default-props */
import { FC } from "react";
import Image from "next/image";
import { placeholderBlurUrl } from "@lib/placeholderBlurUrl";

import { Variants } from "framer-motion";

import { Plus } from "@components/icons";
import { FaGlobeAmericas } from "react-icons/fa";

import { useUI } from "@components/ui/context";

import { ProductImage, ProductPrice } from "@framework/types/product";

import { currencyMap } from "@framework/utils/optionMapping";

import {
    ActionButton,
    ImageWrapper,
    ProductAction,
    ProductInfo,
    Root,
} from "./ProductOverview.styled";
import { useProduct } from "../context";

interface Props {
    productImage: ProductImage;
    productName: string;
    productPrice: ProductPrice;
    variant?: "product" | "review";
}

const ProductOverview: FC<Props> = ({
    productName,
    productPrice,
    productImage,
    variant = "product",
}) => {
    const variants: Variants = {
        isHidden: { y: "150%", opacity: 0, maxHeight: "50vh" },
        isOpen: {
            y: 0,
            opacity: 1,
            maxHeight: "50vh",
            transition: { duration: 0.2 },
        },
    };

    const {
        isProductCartOpen,
        isProductAdded,
        isHelpOpen,
        isReviewOpen,
        closeHelp,
        openProductCart,
    } = useUI();
    const { closeProductInformation, isProductInfoOpen } = useProduct();

    return (
        <Root
            initial="isHidden"
            animate={
                isProductCartOpen || isProductAdded ? "isHidden" : "isOpen"
            }
            exit={{
                y: "150%",
                opacity: 0,
                maxHeight: "50vh",
                transition: { duration: 10 },
            }}
            variants={variants}
            key="product-overview"
            $clip={!isProductInfoOpen && !isHelpOpen && !isReviewOpen}
        >
            <button type="button" className="flex items-center w-full">
                <ImageWrapper>
                    <Image
                        placeholder="blur"
                        blurDataURL={placeholderBlurUrl}
                        src={
                            productImage.url ?? "/product-image-placeholder.svg"
                        }
                        alt={productImage.alt ?? productName ?? "product"}
                        layout="responsive"
                        height={3}
                        width={3}
                        objectFit="contain"
                        priority
                        quality={60}
                    />
                </ImageWrapper>
                <ProductInfo>
                    <h3>{productName}</h3>
                    <span
                        className="flex text-grey"
                        style={{ marginTop: "0.1em" }}
                    >
                        {currencyMap[productPrice.currencyCode]}
                        {productPrice.value}
                    </span>
                </ProductInfo>
            </button>
            <div className="relative flex items-center justify-end w-full h-full">
                <ProductAction>
                    {variant === "product" ? (
                        <ActionButton
                            type="button"
                            onClick={() => {
                                openProductCart();
                                closeProductInformation();
                                closeHelp();
                            }}
                        >
                            <span>
                                <Plus />
                                <span>Select Variant</span>
                            </span>
                        </ActionButton>
                    ) : (
                        <ActionButton type="button">
                            <span>
                                <FaGlobeAmericas
                                    style={{ fill: "var(--black-blue)" }}
                                />
                                <span>Share With Us</span>
                            </span>
                        </ActionButton>
                    )}
                </ProductAction>
            </div>
        </Root>
    );
};

export default ProductOverview;
