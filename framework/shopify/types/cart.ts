import { ProductOption, ProductVariant } from "./product";

interface Discount {
    value: number;
}

export interface LineItem {
    id: string;
    variantId: string;
    productId: string;
    name: string;
    path: string;
    quantity: number;
    discounts: Discount[];
    options?: ProductOption[];
    variant: Partial<ProductVariant>;
    productType: string;
}

export interface Cart {
    id: string;
    webUrl: string;
    createdAt: string;
    completedAt: string;
    currency: { code: string };
    taxesIncluded: boolean;
    // taxe, discounts excluded
    lineItemsSubtotalPrice: number;
    // taxes, discounts included
    totalPrice: number;
    lineItems: LineItem[];
    discounts: Discount[];
}
