import { CurrencyCode } from "@framework/schema";

export interface ProductImage {
    url: string;
    alt?: string;
}

export interface ProductPrice {
    value: number;
    currencyCode: CurrencyCode;
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
}
