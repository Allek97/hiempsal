export interface ProductImage {
    url: string;
    alt?: string;
}

export interface ProductPrice {
    value: number;
    currencyCode: "USD" | "CAD" | "EUR";
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
