import {
    Checkout,
    CheckoutLineItemEdge,
    ImageConnection,
    Product as ShopifyProduct,
    ProductOption,
    ProductPriceRange,
    ProductVariantConnection,
    SelectedOption,
} from "@framework/schema";
import { Cart, LineItem } from "@framework/types/cart";
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

const normalizeLineItem = ({
    node: { id, title, variant, ...rest },
}: CheckoutLineItemEdge): LineItem => {
    return {
        id,
        variantId: String(variant?.id),
        productId: String(variant?.id),
        name: title,
        path: variant?.product?.handle ?? "",
        discounts: [],
        options: variant?.selectedOptions.map(
            ({ name, value }: SelectedOption) => {
                const option = normalizeProductOption({
                    id,
                    name,
                    values: [value],
                });

                return option;
            }
        ),
        variant: {
            id: String(variant?.id),
            sku: variant?.sku ?? "",
            name: variant?.title,
            image: {
                url:
                    variant?.image?.originalSrc ?? "/product-image-placeholder",
                alt: variant?.image?.altText ?? "",
            },
            requiresShipping: variant?.requiresShipping ?? false,
            price: variant?.priceV2.amount,
            listPrice: variant?.compareAtPriceV2?.amount,
        },
        ...rest,
    };
};

export const normalizeCart = (checkout: Checkout): Cart => {
    const {
        id,
        createdAt,
        completedAt,
        totalPriceV2: { currencyCode, amount: totalAmount },
        subtotalPriceV2: { amount: subTotalAmount },
        taxesIncluded,
        lineItems,
    } = checkout;

    return {
        id,
        createdAt,
        completedAt,
        currency: {
            code: currencyCode,
        },
        taxesIncluded,
        lineItemsSubtotalPrice: +subTotalAmount,
        totalPrice: totalAmount,
        lineItems: lineItems.edges.map(normalizeLineItem),
        discounts: [],
    };
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
