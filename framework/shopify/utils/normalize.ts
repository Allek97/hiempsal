import {
    Checkout,
    CheckoutLineItemEdge,
    Image,
    ImageConnection,
    Maybe,
    ProductOption,
    ProductPriceRange,
    ProductVariantConnection,
    SelectedOption,
} from "@framework/schema";
import { Cart, LineItem } from "@framework/types/cart";
import {
    Metafields,
    Product,
    ProductImage,
    ProductPrice,
    ShopifyProductMeta,
} from "@framework/types/product";

type OptionValues = {
    label: string;
    hexColor?: string;
};

const normalizeProductImages = ({ edges }: ImageConnection): ProductImage[] =>
    edges.map(({ node: { url, altText, ...rest } }) => ({
        url: url ?? "/product-image-placeholder",
        alt: altText ?? "",
        ...rest,
    }));

const normalizeProductImage = (
    image: Maybe<Image> | undefined
): ProductImage => ({
    url: image?.url ?? "/product-image-placeholder",
    alt: image?.altText ?? "",
});

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
            image: variantImage,
            priceV2,
            compareAtPriceV2,
            requiresShipping,
            availableForSale,
        } = node;

        return {
            id,
            name: title,
            sku: sku || id,
            image: normalizeProductImage(variantImage),
            price: +priceV2.amount,
            listPrice: +(compareAtPriceV2?.amount || priceV2.amount),
            requiresShipping, // NOTE Verify with shopify when shipping is required for variants,
            availableForSale,
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
                url: variant?.image?.url ?? "/product-image-placeholder.svg",
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

export const normalizeMediaImages = (
    featureImages: Pick<Metafields, "featureImage1" | "featureImage2">
): ProductImage[] =>
    (Object.keys(featureImages) as Array<keyof typeof featureImages>).map(
        (key) => ({
            url:
                featureImages[key].reference.image?.url ??
                "/product-image-placeholder",
            alt: featureImages[key].reference.alt ?? "",
        })
    );

export const normalizeProduct = (productNode: ShopifyProductMeta): Product => {
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
        availableForSale,
        featureImage1,
        featureImage2,
        featureName,
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
        availableForSale,
        featureImages:
            featureImage1 && featureImage2
                ? normalizeMediaImages({
                      featureImage1,
                      featureImage2,
                  })
                : [],
        options: options
            ? options
                  .filter((o) => o.name !== "Title")
                  .map((o) => normalizeProductOption(o))
            : [],
        variants: variants ? normalizeProductVariants(variants) : [],
        featureName: featureName?.value ?? null,
        ...rest,
    };

    return product;
};
