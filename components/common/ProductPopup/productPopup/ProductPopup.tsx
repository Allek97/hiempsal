/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, FormEvent, useState } from "react";
import { motion } from "framer-motion";

import { Product } from "@framework/types/product";
import useAddItem from "@framework/cart/use-add-item";
import { currencyKeys } from "@lib/option";
import { truncateText } from "@lib/truncateText";

import { Popup } from "@components/ui";
import { Swatch } from "..";

import {
    CartButton,
    Content,
    VariantOptionContainer,
    ProductInfo,
    ProductPolicy,
    ProductVariantList,
    CartBtnWrapper,
    Container,
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

    const addItem = useAddItem();
    const addToCart = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const variant = getVariant(product, choices);
            const input = {
                variantId: variant ? variant.id : product.variants[0].id,
                quantity: 1,
            };

            await addItem(input);
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
                <form onSubmit={addToCart}>
                    <Content>
                        <ProductInfo>
                            <h1>{truncateText(product.name)}</h1>
                            <span>
                                {currencyKeys[`${product.price.currencyCode}`]}
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
                                            {option.values.map((optValue) => {
                                                const variantImg =
                                                    optionName.match(
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
                                                        isAvailable={
                                                            isAvailable
                                                        }
                                                        // eslint-disable-next-line no-unused-vars
                                                        clickHandler={(_e) =>
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
                                                            ] === value
                                                        }
                                                    />
                                                );
                                            })}
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
                    <CartBtnWrapper>
                        <CartButton type="submit">
                            <motion.div
                                initial={{ x: "calc(-100% - 30px)" }}
                                animate={{ x: "calc(-75% - 30px)" }}
                                transition={{
                                    duration: "2",
                                    ease: "easeInOut",
                                }}
                            />
                            <motion.div
                                animate={{
                                    backgroundColor: "#e2e2e2",
                                    color: "var(--secondary)",
                                }}
                            >
                                Add To Cart
                            </motion.div>
                        </CartButton>
                    </CartBtnWrapper>
                </form>
            </Container>
        </Popup>
    );
};

export default ProductPopup;
