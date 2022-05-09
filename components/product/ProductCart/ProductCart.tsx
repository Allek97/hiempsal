/* eslint-disable react/require-default-props */
import { FC, ReactNode } from "react";

import { ProductPopup } from "@components/common";
import { useUI } from "@components/ui/context";
import { Product } from "@framework/types/product";

import { ProductOverview } from "..";
import { Features } from "../ProductInformation";

import { useProductInfo } from "../context";

interface Props {
    product: Product;
    children?: ReactNode | ReactNode[];
}

const ProductCart: FC<Props> = ({ product, children }) => {
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
            {isFeaturesOpen && <Features />}
            {isOverviewOpen && (
                <ProductOverview
                    productImage={product.images[1]}
                    productName={product.name}
                    productPrice={product.price}
                    key="over"
                />
            )}
            {children}
        </ProductPopup>
    );
};

export default ProductCart;
