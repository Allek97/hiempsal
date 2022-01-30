import { FC, ReactNode } from "react";
import { GridRoot } from "./ProductGrid.styled";

interface Props {
    children: ReactNode | ReactNode[];
}

const ProductGrid: FC<Props> = ({ children }) => {
    return <GridRoot>{children}</GridRoot>;
};

export default ProductGrid;
