import { FC } from "react";
import { Product } from "@framework/types/product";
import { Root } from "./ProductView.styled";

interface Props {
    product: Product;
}

const ProductView: FC<Props> = ({ product }) => {
    return <Root>{product.name}</Root>;
};

export default ProductView;
