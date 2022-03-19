import {
    Product,
    ProductImage,
    ProductVariant,
} from "@framework/types/product";

export type AvailableChoices = "color" | "size" | "gender" | string;

export type Choices = {
    // eslint-disable-next-line no-unused-vars
    [P in AvailableChoices]: string;
};

export const hasVariants = (
    isChosen: boolean,
    variants: ProductVariant[],
    choice: AvailableChoices,
    value: string
): boolean =>
    isChosen &&
    variants.some((variant) =>
        variant.options.find(
            (option) =>
                option.displayName
                    .toLowerCase()
                    .match(choice.match(/colou?r/gi) ? /colou?r/gi : choice) &&
                option.values[0].label === value &&
                variant.availableForSale
        )
    );

export const getVariants = (
    variants: ProductVariant[],
    choice: AvailableChoices,
    value: string
): ProductVariant[] =>
    variants.filter((variant) =>
        variant.options.find(
            (option) =>
                option.displayName.toLowerCase() === choice &&
                option.values[0].label === value
        )
    );

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
