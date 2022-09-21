/* eslint-disable react/require-default-props */
import { FC, useMemo } from "react";
import { AnimatePresence } from "framer-motion";

import { ProductPopup } from "@components/common";
import { useUI } from "@components/ui/context";
import { Product } from "@framework/types/product";

import { Review } from "@components/review";

import { ProductOverview } from "..";

import {
    Dimensions,
    Features,
    Materials,
    Shipping,
    Sustainability,
} from "../ProductInformation";

import { useProduct } from "../context";

interface Props {
    product: Product;
}

const ProductCart: FC<Props> = ({ product }) => {
    const {
        isProductAdded,
        isProductCartOpen,
        isMobileMenuOpen,
        isHelpOpen,
        isReviewOpen,
    } = useUI();

    const {
        productId,
        isFeaturesOpen,
        isDimensionsOpen,
        isMaterialsOpen,
        isShippingOpen,
        isSustainability,
        isProductOverviewOpen,
        isProductInfoOpen,
    } = useProduct();

    const isOverviewOpen = useMemo(
        () =>
            !isProductCartOpen &&
            !isProductAdded &&
            !isMobileMenuOpen &&
            (isProductInfoOpen ||
                isProductOverviewOpen ||
                isHelpOpen ||
                isReviewOpen),
        [
            isHelpOpen,
            isMobileMenuOpen,
            isProductAdded,
            isProductCartOpen,
            isProductInfoOpen,
            isProductOverviewOpen,
            isReviewOpen,
        ]
    );

    return (
        <ProductPopup product={product} hasPadding={false}>
            <AnimatePresence>
                {isFeaturesOpen && <Features features={product.features} />}

                {isMaterialsOpen && <Materials materials={product.materials} />}

                {isSustainability && (
                    <Sustainability sustainability={product.sustainability} />
                )}
                {isDimensionsOpen && (
                    <Dimensions dimensions={product.dimensions} />
                )}
                {isShippingOpen && <Shipping shipping={product.shipping} />}
                {isReviewOpen && <Review productId={productId} />}
            </AnimatePresence>
            {isOverviewOpen && (
                <ProductOverview
                    productImage={product.images[product.images.length - 1]}
                    productName={product.name}
                    productPrice={product.price}
                />
            )}
        </ProductPopup>
    );
};

export default ProductCart;
