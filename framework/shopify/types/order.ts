import {
    CurrencyCode,
    OrderCancelReason,
    OrderFinancialStatus,
    OrderFulfillmentStatus,
} from "@framework/schema";
import { Address } from "./address";
import { Maybe } from "./commun";
import { ProductPrice, ProductVariant } from "./product";

export interface OrderLineItem {
    name: string;
    quantity: number;
    price: ProductPrice;
    variant: ProductVariant | null;
    productId: string;
    productType: "clothing" | "technology" | string;
    productSlug: string;
}
export interface OrderFulfillment {
    trackingCompany: string | null;
    trackingNumber: string | null;
    trackingUrl: string | null;
}

export interface Order {
    id: string;
    email: Maybe<string>;
    phone: Maybe<string>;
    orderName: string;
    orderNumber: number;
    statusUrl: string;
    lineItems: OrderLineItem[];
    successfulFulfillments: OrderFulfillment | null;
    totalPrice: ProductPrice;
    totalTax: ProductPrice | null;
    subtotalPrice: ProductPrice | null;
    shippingPrice: ProductPrice | null;
    shippingAddress: Address | null;
    currencyCode: CurrencyCode;
    fulfillmentStatus: OrderFulfillmentStatus;
    financialStatus: Maybe<OrderFinancialStatus>;
    processedAt: string | null;
    cancelReason: Maybe<OrderCancelReason>;
    canceledAt: string | null;
    customerLocale: Maybe<string>;
}
