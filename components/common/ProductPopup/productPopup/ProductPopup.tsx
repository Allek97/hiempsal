/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, FormEvent, ReactNode, useState } from "react";
import { motion, Variants } from "framer-motion";

import { Product, ProductVariant } from "@framework/types/product";

import useAddItem from "@framework/cart/use-add-item";
import { useUI } from "@components/ui/context";

import { currencyMap } from "@framework/utils/optionMapping";
import { truncateText } from "@lib/truncateText";
import { useMediaQueryNext } from "@lib/customHooks";

import Close from "@components/icons/Close";

import { Popup } from "@components/ui";
import { CartButton, ProductSelected, Swatch } from "..";

import {
    Content,
    VariantOptionContainer,
    ProductInfo,
    ProductPolicy,
    ProductVariantList,
    Container,
    CloseWrapper,
} from "./ProductPopup.styled";
import {
    AvailableChoices,
    Choices,
    getVariantImage,
    getVariant,
    hasAllVariantsForSale,
    isOptionAvailable,
} from "../helpers";

interface Props {
    product: Product;
    containedChild?: ReactNode | ReactNode[];
    uncontainedChild?: ReactNode | ReactNode[];
}

const ProductPopup: FC<Props> = ({
    product,
    containedChild,
    uncontainedChild,
}) => {
    const [choices, setChoices] = useState<Choices>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();

    const { isProductAdded, isProductCartOpen, setProductAdded, closePopup } =
        useUI();

    const addItem = useAddItem();
    const addToCart = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const variant = getVariant(product, choices);
            setSelectedVariant(variant);
            const input = {
                variantId: variant ? variant.id : product.variants[0].id,
                quantity: 1,
            };
            setIsLoading(true);
            await addItem(input);
            setIsLoading(false);
            setProductAdded();
        } catch (err) {
            console.log(err);
        }
    };

    const handleSwatchClick = async (
        optionName: AvailableChoices,
        value: string
    ) => {
        setChoices((previous) => ({
            ...previous,
            [optionName]: value,
        }));
    };

    const isScreenMedium = useMediaQueryNext("md");
    const isScreenLarge = useMediaQueryNext("lg");
    const isScreen2XL = useMediaQueryNext("2xl");

    const containerAnimationHeight = (): string => {
        if (isScreen2XL) return "calc(85vh - 4.2rem)";
        if (isScreenLarge) return "calc(90vh - 4.2rem)";
        if (isScreenMedium) return "calc(85vh - 4.2rem)";
        return "calc(90vh - 4.2rem)";
    };

    const containerVariant: Variants = {
        itemAdded: { maxHeight: "50vh", height: "100%" },
        productCartOpen: {
            maxHeight: "90vh",
            height: containerAnimationHeight(),
        },
    };

    const animationHandler = () => {
        if (isProductAdded) return "itemAdded";
        if (isProductCartOpen) return "productCartOpen";
    };

    return (
        <Popup>
            <Container
                key="modal"
                initial={{ height: "calc(0vh - 0rem)" }}
                animate={animationHandler()}
                transition={{ duration: 0.5 }}
                variants={containerVariant}
            >
                {isProductCartOpen && (
                    <motion.div>
                        <form onSubmit={addToCart}>
                            <Content>
                                <ProductInfo>
                                    <h1>{truncateText(product.name)}</h1>
                                    <span>
                                        {
                                            currencyMap[
                                                `${product.price.currencyCode}`
                                            ]
                                        }
                                        {product.price.value}
                                    </span>
                                    {isScreenLarge && (
                                        <CloseWrapper onClick={closePopup}>
                                            <Close />
                                        </CloseWrapper>
                                    )}
                                </ProductInfo>

                                <VariantOptionContainer>
                                    {product.options.map((option) => {
                                        const optionName =
                                            option.displayName.toLowerCase();
                                        return (
                                            <div key={option.id}>
                                                <h3>Select {optionName}</h3>
                                                <ProductVariantList>
                                                    {option.values.map(
                                                        (optValue) => {
                                                            const variantImg =
                                                                optionName.match(
                                                                    /colou?r/gi
                                                                )
                                                                    ? getVariantImage(
                                                                          product,
                                                                          optValue.label
                                                                      )
                                                                    : undefined;

                                                            const value =
                                                                optValue.label;

                                                            const isGloballyAvailable =
                                                                isOptionAvailable(
                                                                    product.variants,
                                                                    optionName,
                                                                    value
                                                                );

                                                            const isAvailable =
                                                                hasAllVariantsForSale(
                                                                    product.variants,
                                                                    {
                                                                        ...choices,
                                                                        [optionName]:
                                                                            value,
                                                                    }
                                                                );

                                                            return (
                                                                <Swatch
                                                                    key={
                                                                        optValue.label
                                                                    }
                                                                    value={
                                                                        value
                                                                    }
                                                                    option={
                                                                        optionName
                                                                    }
                                                                    image={
                                                                        variantImg
                                                                    }
                                                                    isOutOfStock={
                                                                        !isGloballyAvailable
                                                                    }
                                                                    isAvailable={
                                                                        isAvailable
                                                                    }
                                                                    clickHandler={(
                                                                        // eslint-disable-next-line no-unused-vars
                                                                        _e
                                                                    ) =>
                                                                        handleSwatchClick(
                                                                            optionName,
                                                                            value
                                                                        )
                                                                    }
                                                                    isSelected={
                                                                        optionName in
                                                                            choices &&
                                                                        choices[
                                                                            optionName
                                                                        ] ===
                                                                            value
                                                                    }
                                                                />
                                                            );
                                                        }
                                                    )}
                                                </ProductVariantList>
                                            </div>
                                        );
                                    })}
                                </VariantOptionContainer>
                            </Content>
                            <ProductPolicy>
                                <span>Delivery time: 5-7 business days</span>
                                <span>100-day return period</span>
                                <span>Free returns</span>
                                <span>FREE SHIPPING FROM $50.00 CAD</span>
                            </ProductPolicy>
                            <CartButton isLoading={isLoading} />
                        </form>
                    </motion.div>
                )}
                {isProductAdded && (
                    <ProductSelected
                        selectedVariant={selectedVariant ?? product.variants[0]}
                        productName={product.name}
                        currencyCode={product.price.currencyCode}
                    />
                )}
                {/*Add children for custom use*/}
                {containedChild}
            </Container>
            {uncontainedChild}
        </Popup>
    );
};

ProductPopup.defaultProps = {
    containedChild: undefined,
    uncontainedChild: undefined,
};

export default ProductPopup;
