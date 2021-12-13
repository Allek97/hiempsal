import {
    ImageConnection,
    Product as ShopifyProduct,
    ProductPriceRange,
} from "@framework/schema";
import { Product, ProductImage, ProductPrice } from "@framework/types/product";

export const normalizeProductImages = ({
    edges,
}: ImageConnection): ProductImage[] =>
    edges.map(({ node: { originalSrc, altText, ...rest } }) => ({
        url: originalSrc ?? "/product-image-placeholder",
        alt: altText ?? "",
        ...rest,
    }));

export const normalizeProductPrice = ({
    minVariantPrice: { amount, currencyCode },
}: ProductPriceRange): ProductPrice => ({
    value: +amount,
    currencyCode,
});

export const normalizeProduct = (productNode: ShopifyProduct): Product => {
    const {
        id,
        title: name,
        vendor,
        handle,
        description,
        priceRange,
        images: imageConnection,
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
        ...rest,
    };

    return product;
};
