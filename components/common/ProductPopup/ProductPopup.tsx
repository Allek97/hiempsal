import { FC, FormEvent, useState } from "react";

import { Popup } from "@components/ui";
import { Swatch } from "@components/product";

import { Product } from "@framework/types/product";

import useAddItem from "@framework/cart/use-add-item";
import useCart from "@framework/cart/use-cart";

import {
    Choices,
    getVariant,
    getVariantImage,
} from "@components/product/helpers";
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

interface Props {
    product: Product;
}

const ProductPopup: FC<Props> = ({ product }) => {
    const [choices, setChoices] = useState<Choices>({});

    const { data } = useCart();

    const addItem = useAddItem();
    const addToCart = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const variant = getVariant(product, choices);
        const input = {
            variantId: variant ? variant.id : product.variants[0].id,
            quantity: 1,
        };

        console.log(variant);

        await addItem(input);
    };

    console.log(data);

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
