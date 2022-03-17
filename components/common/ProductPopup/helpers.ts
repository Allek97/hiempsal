import {
    Product,
    ProductImage,
    ProductVariant,
} from "@framework/types/product";

type AvailableChoices = "color" | "size" | "gender" | string;

export type Choices = {
    // eslint-disable-next-line no-unused-vars
    [P in AvailableChoices]: string;
};

export const getVariant = (
    product: Product,
    choices: Choices
): ProductVariant | undefined =>
    product.variants.find((variant) =>
        variant.options.every((variantOpt) => {
            const optionName = variantOpt.displayName.toLowerCase();
            return (
                optionName in choices &&
                variantOpt.values[0].label === choices[optionName]
            );
        })
    );

export const getVariantImage = (
    product: Product,
    color: string
): ProductImage | undefined =>
    product.variants.find((variant) =>
        variant.options.find((variantOpt) => {
            const optionName = variantOpt.displayName.toLowerCase();

            return (
                optionName.match(/colou?r/gi) &&
                variantOpt.values[0].label === color
            );
        })
    )?.image;
