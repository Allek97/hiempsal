import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { motion } from "framer-motion";

import { useUI } from "@components/ui/context";
import useAddItem from "@framework/cart/use-add-item";

import { Product, ProductVariant } from "@framework/types/product";

import { truncateText } from "@lib/truncateText";
import { Media } from "@lib/media";
import { currencyMap } from "@framework/utils/optionMapping";
import { RiErrorWarningLine } from "react-icons/ri";

import Close from "@components/icons/Close";

import {
    AvailableChoices,
    Choices,
    getVariant,
    getVariantImage,
    hasAllVariantsForSale,
    isOptionAvailable,
} from "@components/common/helpers";

import { Swatch } from "../swatch";

import {
    CloseWrapper,
    Form,
    ProductInfo,
    ProductPolicy,
    ProductVariantList,
    VariantOptionContainer,
} from "./ProductCart.styled";
import { CartButton } from "../cartButton";

export interface ProductCartProps {
    product: Product;
    setSelectedVariant: Dispatch<SetStateAction<ProductVariant | undefined>>;
}

const ProductCart: FC<ProductCartProps> = ({ product, setSelectedVariant }) => {
    const [choices, setChoices] = useState<Choices>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSubmitAttempt, setIsSubmitAttempt] = useState<boolean>(false);

    const { setProductAdded, closePopup } = useUI();

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

    const handleSwatchClick = (optionName: AvailableChoices, value: string) => {
        setChoices((previous) => ({
            ...previous,
            [optionName]: value,
        }));
    };

    return (
        <div data-testid="product-cart">
            <Form onSubmit={addToCart}>
                <div className="relative flex flex-col">
                    <ProductInfo>
                        <h1>{truncateText(product.name)}</h1>
                        <span>
                            {currencyMap[`${product.price.currencyCode}`]}
                            {product.price.value}
                        </span>
                        <CloseWrapper
                            data-testid="close-wrapper"
                            onClick={closePopup}
                        >
                            <Media greaterThanOrEqual="lg">
                                <Close />
                            </Media>
                        </CloseWrapper>
                    </ProductInfo>

                    <VariantOptionContainer>
                        {product.options.map((option) => {
                            const optionName = option.displayName.toLowerCase();
                            const showError =
                                !(optionName in choices) && isSubmitAttempt;

                            return (
                                <div key={option.id}>
                                    <motion.div className="relative flex">
                                        <motion.div
                                            className="absolute -top-0.5"
                                            initial={{ opacity: 0 }}
                                            animate={
                                                showError
                                                    ? { opacity: 1 }
                                                    : {
                                                          opacity: 0,
                                                          transition: {
                                                              duration: 0,
                                                          },
                                                      }
                                            }
                                        >
                                            <RiErrorWarningLine
                                                style={{
                                                    fill: "var(--orange-red)",
                                                }}
                                                className="w-5 h-5"
                                            />
                                        </motion.div>
                                        <motion.h3
                                            initial={{ x: 0 }}
                                            animate={
                                                showError
                                                    ? { x: "1.5rem" }
                                                    : { x: 0 }
                                            }
                                        >
                                            Select {optionName}
                                        </motion.h3>
                                    </motion.div>
                                    <ProductVariantList>
                                        {option.values.map((optValue) => {
                                            const variantImg = optionName.match(
                                                /colou?r/gi
                                            )
                                                ? getVariantImage(
                                                      product,
                                                      optValue.label
                                                  )
                                                : undefined;

                                            const value = optValue.label;

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
                                                        [optionName]: value,
                                                    }
                                                );

                                            return (
                                                <Swatch
                                                    key={optValue.label}
                                                    value={value}
                                                    option={optionName}
                                                    image={variantImg}
                                                    isOutOfStock={
                                                        !isGloballyAvailable
                                                    }
                                                    isAvailable={isAvailable}
                                                    clickHandler={
                                                        handleSwatchClick
                                                    }
                                                    isSelected={
                                                        optionName in choices &&
                                                        choices[optionName] ===
                                                            value
                                                    }
                                                />
                                            );
                                        })}
                                    </ProductVariantList>
                                </div>
                            );
                        })}
                    </VariantOptionContainer>
                </div>
                <ProductPolicy>
                    <span>Delivery time: 5-7 business days</span>
                    <span>100-day return period</span>
                    <span>Free returns</span>
                    <span>FREE SHIPPING FROM $50.00 CAD</span>
                </ProductPolicy>
                <CartButton
                    isLoading={isLoading}
                    preText="Add to Cart"
                    loadingText="Adding"
                    onClick={() => setIsSubmitAttempt(true)}
                />
            </Form>
        </div>
    );
};

export default ProductCart;
