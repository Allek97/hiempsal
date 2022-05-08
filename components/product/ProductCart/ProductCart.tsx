/* eslint-disable react/require-default-props */
import { ProductPopup } from "@components/common";
import { useUI } from "@components/ui/context";
import { Product } from "@framework/types/product";

import { FC, ReactNode } from "react";
import { ProductOverview } from "..";

interface Props {
    product: Product;
    isProductOverviewOpen: boolean;
    children?: ReactNode | ReactNode[];
}

const ProductCart: FC<Props> = ({
    product,
    isProductOverviewOpen,
    children,
}) => {
    const { isProductAdded, isProductCartOpen, isMobileMenuOpen } = useUI();
    return (
        <ProductPopup product={product} hasPadding={false}>
            <div className="h-32 bg-black">asdsa</div>
            {!isProductCartOpen &&
                !isProductAdded &&
                !isMobileMenuOpen &&
                isProductOverviewOpen && (
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
