import { Product as ShopifyProduct, MediaImage } from "@framework/schema";

// Added Metafields related
type ImageReference = {
    reference: MediaImage;
};

export interface Metafields {
    featureImage1: ImageReference;
    featureImage2: ImageReference;
    featureName: { value: string };
}

export type ShopifyProductMeta = ShopifyProduct & Metafields;

///////////////////////////////////////////////////////////////////

export interface ProductImage {
    url: string;
    alt?: string;
}

export interface ProductPrice {
    value: number;
    currencyCode: "USD" | "EUR" | "CAD" | string;
}

export interface ProductOptionValues {
    label: string;
    hexColor?: string;
}

export interface ProductOption {
    id: string;
    displayName: string;
    values: ProductOptionValues[];
}

export interface ProductVariant {
    id: string;
    name: string;
    sku: string;
    image?: ProductImage;
    price: number;
    listPrice: number;
    requiresShipping: boolean;
    availableForSale: boolean;
    options: ProductOption[];
}

export interface Product {
    id: string;
    name: string;
    vendor: string;
    description: string;
    path: string;
    slug: string;
    images: ProductImage[];
    price: ProductPrice;
    availableForSale: boolean;
    featureImages: ProductImage[];
    featureName: string;
    options: ProductOption[];
    variants: ProductVariant[];
}
