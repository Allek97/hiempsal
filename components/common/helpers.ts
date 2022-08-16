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

export const isOptionAvailable = (
    variants: ProductVariant[],
    choice: AvailableChoices,
    value: string
): boolean =>
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
    choices: Choices
): ProductVariant[] =>
    variants.filter((variant) => {
        return Object.entries(choices).every((choice) =>
            variant.options.find(
                (option) =>
                    option.displayName.toLowerCase() === choice[0] &&
                    option.values[0].label === choice[1]
            )
        );
    });

export const hasAllVariantsForSale = (
    variants: ProductVariant[],
    choices: Choices
): boolean =>
    variants.some((variant) => {
        return (
            variant.availableForSale &&
            Object.entries(choices).every((choice) =>
                variant.options.find(
                    (option) =>
                        option.displayName
                            .toLowerCase()
                            .match(
                                choice[0].match(/colou?r/gi)
                                    ? /colou?r/gi
                                    : choice[0]
                            ) && option.values[0].label === choice[1]
                )
            )
        );
    });

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

export const getVariantImages = (
    product: Product
): (ProductImage | undefined)[] =>
    product.options
        .filter((option) => option.displayName.match(/colou?r/gi))[0]
        .values.map((value) => getVariantImage(product, value.label));
