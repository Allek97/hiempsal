import {
    ImageConnection,
    Product as ShopifyProduct,
    ProductOption,
    ProductPriceRange,
    ProductVariantConnection,
} from "@framework/schema";
import { Product, ProductImage, ProductPrice } from "@framework/types/product";

type OptionValues = {
    label: string;
    hexColor?: string;
};

const normalizeProductImages = ({ edges }: ImageConnection): ProductImage[] =>
    edges.map(({ node: { originalSrc, altText, ...rest } }) => ({
        url: originalSrc ?? "/product-image-placeholder",
        alt: altText ?? "",
        ...rest,
    }));

const normalizeProductPrice = ({
    minVariantPrice: { amount, currencyCode },
}: ProductPriceRange): ProductPrice => ({
    value: +amount,
    currencyCode,
});

const normalizeProductOption = ({
    id,
    name: displayName,
    values,
}: ProductOption) => {
    const normalized = {
        id,
        displayName,
        values: values.map((value) => {
            let output: OptionValues = {
                label: value,
            };
            if (displayName.match(/colou?r/gi)) {
                output = {
                    ...output,
                    hexColor: value,
                };
            }
            return output;
        }),
    };

    return normalized;
};

const normalizeProductVariants = ({ edges }: ProductVariantConnection) => {
    return edges.map(({ node }) => {
        const {
            id,
            selectedOptions,
            sku,
            title,
            priceV2,
            compareAtPriceV2,
            requiresShipping,
        } = node;

        return {
            id,
            name: title,
            sku: sku || id,
            price: +priceV2.amount,

            listPrice: +(compareAtPriceV2?.amount || priceV2.amount),
            requiresShipping, // NOTE Verify with shopify when shipping is required for variants,
            options: selectedOptions.map(({ name, value }) => {
                const option = normalizeProductOption({
                    id,
                    name,
                    values: [value],
                });

                return option;
            }),
        };
    });
};

export const normalizeProduct = (productNode: ShopifyProduct): Product => {
    const {
        id,
        title: name,
        vendor,
        handle,
        description,
        priceRange,
        images: imageConnection,
        options,
        variants,
        ...rest
    } = productNode;

    const product = {
        id,
        name,
        vendor,
        description,
        path: `/${handle}`,
        slug: handle.replace(/^\/+|\/+$/g, ""),
        images: normalizeProductImages(imageConnection),
        price: normalizeProductPrice(priceRange),
        options: options
            ? options
                  .filter((o) => o.name !== "Title")
                  .map((o) => normalizeProductOption(o))
            : [],
        variants: variants ? normalizeProductVariants(variants) : [],
        ...rest,
    };

    return product;
};
