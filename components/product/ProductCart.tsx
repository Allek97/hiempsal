import { ProductPopup } from "@components/common";
import { useUI } from "@components/ui/context";
import { Product } from "@framework/types/product";
import { FC } from "react";
import { ProductOverview } from ".";

interface Props {
    product: Product;
    isProductOverviewOpen: boolean;
}

const ProductCart: FC<Props> = ({ product, isProductOverviewOpen }) => {
    const { isProductCartOpen, isProductAdded } = useUI();
    return (
        <ProductPopup product={product}>
            {isProductOverviewOpen && !isProductCartOpen && !isProductAdded && (
                <ProductOverview />
            )}
        </ProductPopup>
    );
};

export default ProductCart;
