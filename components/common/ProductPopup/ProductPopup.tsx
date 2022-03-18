import { FC, FormEvent, useState } from "react";

import { Popup } from "@components/ui";
import { Swatch } from "@components/product";

import { Product, ProductVariant } from "@framework/types/product";

import useAddItem from "@framework/cart/use-add-item";

import { currencyKeys } from "@lib/option";

import {
    CartButton,
    Content,
    VariantOptionContainer,
    ProductInfo,
    ProductPolicy,
    ProductVariantList,
    CartBtnWrapper,
} from "./ProductPopup.styled";
import { Choices, getVariant, getVariantImage } from "./helpers";

interface Props {
    product: Product;
}

const ProductPopup: FC<Props> = ({ product }) => {
    const [variants, setVariants] = useState<ProductVariant[]>(
        product.variants
    );
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

    const maximumLength = (content: string, maxLength = 29): string => {
        const contentCut = content.substring(0, maxLength - 1);

        if (content.length > maxLength) return `${contentCut}...`;
        return contentCut;
    };

    return (
        <Popup>
            <form onSubmit={addToCart}>
                <Content>
                    <ProductInfo>
                        <h1>{maximumLength(product.name)}</h1>
                        <span>
                            {currencyKeys[`${product.price.currencyCode}`]}
                            {product.price.value}
                        </span>
                    </ProductInfo>
                    <VariantOptionContainer>
                        {product.options.map((option) => {
                            const optionName = option.displayName.toLowerCase();

                            return (
                                <div key={option.id}>
                                    <h3>Select {optionName}</h3>
                                    <ProductVariantList>
                                        {option.values.map((optValue) => {
                                            const variantImg = optionName.match(
                                                /colou?r/s
                                            )
                                                ? getVariantImage(
                                                      product,
                                                      optValue.label
                                                  )
                                                : undefined;

                                            return (
                                                <Swatch
                                                    key={optValue.label}
                                                    value={optValue.label}
                                                    option={optionName}
                                                    image={variantImg}
                                                    isActive={
                                                        choices[optionName] ===
                                                        optValue.label
                                                    }
                                                    onClick={() => {
                                                        setChoices(
                                                            (previous) => ({
                                                                ...previous,
                                                                [optionName]:
                                                                    optValue.label,
                                                            })
                                                        );
                                                    }}
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
                    <CartButton type="submit">Add To Cart</CartButton>
                </CartBtnWrapper>
            </form>
        </Popup>
    );
};

export default ProductPopup;
