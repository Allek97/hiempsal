import { ProductPopup } from "@components/common";
import { Product } from "@framework/types/product";
import { FC } from "react";
import { ProductOverview } from "..";

interface Props {
    product: Product;
    isProductOverviewOpen: boolean;
}

const ProductCart: FC<Props> = ({ product, isProductOverviewOpen }) => {
    return (
        <ProductPopup product={product}>
            {isProductOverviewOpen && (
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
