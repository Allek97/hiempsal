/* eslint-disable react/require-default-props */
import { FC, ReactNode, useState } from "react";
import { Variants } from "framer-motion";

import { Product, ProductVariant } from "@framework/types/product";

import { useUI } from "@components/ui/context";

import { Popup } from "@components/ui";
import { ProductSelected, ProductCart } from "..";

import { Container, Paddings } from "./ProductPopup.styled";

interface Props {
    product: Product;
    children: ReactNode | ReactNode[];
    hasPadding?: boolean;
}

const ProductPopup: FC<Props> = ({ product, children, hasPadding = true }) => {
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();

    const { isProductAdded, isProductCartOpen } = useUI();

    const containerVariant: Variants = {
        itemAdded: { maxHeight: "50vh", height: "100%" },
        productCartOpen: {
            maxHeight: "90vh",
        },
        closed: { maxHeight: "0" },
    };

    const animationHandler = () => {
        if (isProductAdded) return "itemAdded";
        if (isProductCartOpen) return "productCartOpen";
        if (!isProductCartOpen && !isProductAdded) return "closed";
    };

    return (
        <Popup>
            <Container
                key="modal"
                initial={{ maxHeight: "0vh" }}
                animate={animationHandler()}
                transition={{ duration: 0.5 }}
                variants={containerVariant}
            >
                <Paddings hasPadding={hasPadding}>
                    {isProductCartOpen && (
                        <ProductCart
                            product={product}
                            setSelectedVariant={setSelectedVariant}
                        />
                    )}
                    {isProductAdded && (
                        <ProductSelected
                            selectedVariant={
                                selectedVariant ?? product.variants[0]
                            }
                            productName={product.name}
                            currencyCode={product.price.currencyCode}
                        />
                    )}
                    {/*Add children for custom use*/}
                    {children}
                </Paddings>
            </Container>
        </Popup>
    );
};

export default ProductPopup;
