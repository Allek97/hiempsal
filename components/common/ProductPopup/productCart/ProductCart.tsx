import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";

import { useUI } from "@components/ui/context";
import useAddItem from "@framework/cart/use-add-item";

import { Product, ProductVariant } from "@framework/types/product";

import { truncateText } from "@lib/truncateText";
import { Media } from "@lib/media";
import { currencyMap } from "@framework/utils/optionMapping";

import Close from "@components/icons/Close";
import { Swatch } from "../swatch";

import {
    AvailableChoices,
    Choices,
    getVariant,
    getVariantImage,
    hasAllVariantsForSale,
    isOptionAvailable,
} from "../helpers";
import {
    CloseWrapper,
    Form,
    ProductInfo,
    ProductPolicy,
    ProductVariantList,
    VariantOptionContainer,
} from "./ProductCart.styled";
import { CartButton } from "../cartButton";

interface Props {
    product: Product;
    setSelectedVariant: Dispatch<SetStateAction<ProductVariant | undefined>>;
}

const ProductCart: FC<Props> = ({ product, setSelectedVariant }) => {
    const [choices, setChoices] = useState<Choices>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
        <div>
            <Form onSubmit={addToCart}>
                <div className="relative flex flex-col">
                    <ProductInfo>
                        <h1>{truncateText(product.name)}</h1>
                        <span>
                            {currencyMap[`${product.price.currencyCode}`]}
                            {product.price.value}
                        </span>
                        <CloseWrapper onClick={closePopup}>
                            <Media greaterThanOrEqual="lg">
                                <Close />
                            </Media>
                        </CloseWrapper>
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
                <CartButton isLoading={isLoading} />
            </Form>
        </div>
    );
};

export default ProductCart;
