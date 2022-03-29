/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, FormEvent, useState } from "react";
import { motion } from "framer-motion";

import { Product, ProductVariant } from "@framework/types/product";

import useAddItem from "@framework/cart/use-add-item";
import { useUI } from "@components/ui/context";

import { currencyKeys } from "@lib/option";
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
}

const ProductPopup: FC<Props> = ({ product }) => {
    const [choices, setChoices] = useState<Choices>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();

    const isScreenMedium = useMediaQueryNext("md");
    const isScreenLarge = useMediaQueryNext("lg");
    const isScreen2XL = useMediaQueryNext("2xl");

    const containerAnimationHeight = (): string => {
        if (isScreen2XL) return "calc(85vh - 4.2rem)";
        if (isScreenLarge) return "calc(90vh - 4.2rem)";
        if (isScreenMedium) return "calc(85vh - 4.2rem)";
        return "calc(90vh - 4.2rem)";
    };

    const { isProductAdded, setProductAdded, closeProductPopup } = useUI();

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

    return (
        <Popup>
            <Container>
                {!isProductAdded ? (
                    <motion.div
                        key="modal"
                        initial={{ height: "calc(0vh - 0rem)" }}
                        animate={{
                            height: containerAnimationHeight(),
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        {isScreenLarge && (
                            <CloseWrapper onClick={closeProductPopup}>
                                <Close />
                            </CloseWrapper>
                        )}
                        <form onSubmit={addToCart}>
                            <Content>
                                <ProductInfo>
                                    <h1>{truncateText(product.name)}</h1>
                                    <span>
                                        {
                                            currencyKeys[
                                                `${product.price.currencyCode}`
                                            ]
                                        }
                                        {product.price.value}
                                    </span>
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
                ) : (
                    <ProductSelected
                        selectedVariant={selectedVariant ?? product.variants[0]}
                        productName={product.name}
                        currencyCode={product.price.currencyCode}
                    />
                )}
            </Container>
        </Popup>
    );
};

export default ProductPopup;
