import { Product as ShopifyProduct, MediaImage } from "@framework/schema";

////////////////////////////////////////////////////////////////////////////////
// NOTE: Metafields
////////////////////////////////////////////////////////////////////////////////
type ImageReference = {
    reference: MediaImage;
};

type JSONType = {
    value: string;
};

export interface Metafields {
    featureImage1: ImageReference;
    featureImage2: ImageReference;
    featureName: JSONType;
    features: JSONType;
    materials: JSONType;
    sustainability: JSONType;
    dimensions: JSONType;
    shipping: JSONType;
    type: {
        value: "clothing" | "technology";
    };
}

export type ShopifyProductMeta = ShopifyProduct & Metafields;

export type ProductFeatures = {
    features: {
        [key: string]: {
            description?: string;
            content: string;
        };
    };
    descriptions?: string[];
};

export type ProductMaterials = {
    technologies?: {
        features?: {
            [key: string]: {
                description?: string;
                content: string;
            };
        };
        descriptions?: string[];
    };
    productCare?: {
        features?: {
            [key: string]: {
                description?: string;
                content: string;
            };
        };
        descriptions?: string[];
    };
    materialComposition?: {
        features?: {
            [key: string]: {
                description?: string;
                content: string;
            };
        };
        descriptions?: string[];
    };
};

export type ProductSustainability = {
    features: {
        [key: string]: {
            description?: string;
            content: string;
        };
    };
    descriptions?: string[];
};

export type ProductDimensions = {
    [key: string]: {
        description: string;
        content: string[];
    };
};

export type ProductShipping = {
    shipping: {
        description: string;
        content: string;
        notice?: string;
    };
    shippingCost: {
        description: string;
        content: string;
        notice?: string;
    };
};
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
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
    price?: number;
    listPrice?: number | null;
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
    features: ProductFeatures;
    materials: ProductMaterials;
    sustainability: ProductSustainability;
    dimensions: ProductDimensions;
    shipping: ProductShipping;
    type: "clothing" | "technology";
    options: ProductOption[];
    variants: ProductVariant[];
}
