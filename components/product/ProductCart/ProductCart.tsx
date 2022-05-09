/* eslint-disable react/require-default-props */
import { FC } from "react";
import { AnimatePresence } from "framer-motion";

import { ProductPopup } from "@components/common";
import { useUI } from "@components/ui/context";
import { Product } from "@framework/types/product";

import { ProductOverview } from "..";
import { Features } from "../ProductInformation";

import { useProductInfo } from "../context";

interface Props {
    product: Product;
}

const ProductCart: FC<Props> = ({ product }) => {
    const { isProductAdded, isProductCartOpen, isMobileMenuOpen } = useUI();

    const {
        isFeaturesOpen,
        isDimensionsOpen,
        isMaterialsOpen,
        isShippingOpen,
        isSustainability,
        isProductOverviewOpen,
    } = useProductInfo();

    const isOverviewOpen =
        !isProductCartOpen &&
        !isProductAdded &&
        !isMobileMenuOpen &&
        (isFeaturesOpen ||
            isDimensionsOpen ||
            isMaterialsOpen ||
            isShippingOpen ||
            isSustainability ||
            isProductOverviewOpen);

    return (
        <ProductPopup product={product} hasPadding={false}>
            <AnimatePresence>
                {isFeaturesOpen && <Features features={product.features} />}
            </AnimatePresence>
            {isOverviewOpen && (
                <ProductOverview
                    productImage={product.images[1]}
                    productName={product.name}
                    productPrice={product.price}
                />
            )}
        </ProductPopup>
    );
};

export default ProductCart;
