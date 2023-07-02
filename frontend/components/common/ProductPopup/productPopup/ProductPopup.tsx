/* eslint-disable react/require-default-props */
import { FC, ReactNode, useState } from "react";
import { AnimatePresence, Variants } from "framer-motion";

import { Product, ProductVariant } from "@framework/types/product";

import { useUI } from "@components/ui/context";

import { Popup } from "@components/ui";

import { HelpCardContent } from "@components/elements/HelpCard";
import { ProductSelected, ProductCart } from "..";

import { Container, Paddings } from "./ProductPopup.styled";

export interface Props {
    product: Product;
    children?: ReactNode | ReactNode[];
    hasPadding?: boolean;
}

const ProductPopup: FC<Props> = ({ product, children, hasPadding = true }) => {
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();

    const { isProductAdded, isProductCartOpen, isHelpOpen } = useUI();

    const containerVariant: Variants = {
        itemAdded: { maxHeight: "50vh", height: "100%" },
        productCartOpen: {
            maxHeight: "90vh",
        },
    };

    const animationHandler = () => {
        if (isProductAdded) return "itemAdded";
        if (isProductCartOpen) return "productCartOpen";
    };

    return (
        <Popup data-testid="product-popup">
            <Container
                key="modal"
                initial={{ maxHeight: "0vh" }}
                animate={animationHandler()}
                transition={{ duration: 0.5 }}
                variants={containerVariant}
            >
                <Paddings hasPadding>
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
                </Paddings>
            </Container>
            <div className="bg-white">
                <Paddings hasPadding>
                    <AnimatePresence>
                        {isHelpOpen && <HelpCardContent />}
                    </AnimatePresence>
                </Paddings>
            </div>

            {/*Add children for custom use*/}
            <Paddings hasPadding={hasPadding}>{children}</Paddings>
        </Popup>
    );
};

export default ProductPopup;
