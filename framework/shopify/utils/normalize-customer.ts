import {
    Customer,
    MailingAddress,
    MoneyV2,
    OrderConnection,
    OrderLineItemEdge,
    ProductVariant as ShopifyProductVariant,
} from "@framework/schema";
import { Address } from "@framework/types/address";
import { Customer as ShopifyCustomer } from "@framework/types/customer";
import { Order, OrderLineItem } from "@framework/types/order";
import { ProductPrice, ProductVariant } from "@framework/types/product";
import { normalizeProductImage, normalizeProductOption } from "./normalize";

const normalizeOrderPrice = ({
    amount,
    currencyCode,
}: MoneyV2): ProductPrice => ({
    value: +amount,
    currencyCode,
});

const normalizeOrderVariant = (
    variant: ShopifyProductVariant
): ProductVariant => {
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
    } = variant;

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
};

export const normalizeOrderLineItem = (
    item: OrderLineItemEdge
): OrderLineItem => {
    const { quantity, title: name, variant, originalTotalPrice } = item.node;

    return {
        name,
        quantity,
        price: normalizeOrderPrice(originalTotalPrice),
        variant: variant ? normalizeOrderVariant(variant) : null,
    };
};

export const normalizeAddress = (address: MailingAddress): Address => {
    const {
        id,
        name,
        address1,
        address2,
        city,
        country,
        countryCodeV2,
        zip,
        province,
        provinceCode,
        formatted,
        formattedArea,
        firstName,
        lastName,
        phone,
        latitude,
        longitude,
        company,
    } = address;

    return {
        id,
        name,
        address1,
        address2,
        city,
        country,
        countryCodeV2,
        zip,
        province,
        provinceCode,
        formatted,
        formattedArea,
        firstName,
        lastName,
        phone,
        latitude: latitude ?? null,
        longitude: longitude ?? null,
        company,
    };
};

export const normalizeCustomerOrders = ({
    edges,
}: OrderConnection): Order[] => {
    return edges.map(({ node }) => {
        const {
            id,
            name: orderName,
            email,
            phone,
            orderNumber,
            statusUrl,
            lineItems,
            totalPriceV2,
            totalTaxV2,
            subtotalPriceV2,
            totalShippingPriceV2,
            shippingAddress,
            currencyCode,
            fulfillmentStatus,
            financialStatus,
            processedAt,
            cancelReason,
            canceledAt,
            customerLocale,
        } = node;

        return {
            id,
            email: email,
            phone: phone,
            orderName,
            orderNumber,
            statusUrl: String(statusUrl),
            lineItems: lineItems.edges.map((item) =>
                normalizeOrderLineItem(item)
            ),
            totalPrice: normalizeOrderPrice(totalPriceV2),
            totalTax: totalTaxV2 ? normalizeOrderPrice(totalTaxV2) : null,
            subtotalPrice: subtotalPriceV2
                ? normalizeOrderPrice(subtotalPriceV2)
                : null,
            shippingPrice: totalShippingPriceV2
                ? normalizeOrderPrice(totalShippingPriceV2)
                : null,
            shippingAddress: shippingAddress
                ? normalizeAddress(shippingAddress)
                : null,
            currencyCode,
            fulfillmentStatus: fulfillmentStatus,
            financialStatus,
            processedAt,
            cancelReason,
            canceledAt,
            customerLocale,
        };
    });
};

export const normalizeCustomer = (customer: Customer): ShopifyCustomer => {
    const {
        id,
        email,
        firstName,
        lastName,
        phone,
        acceptsMarketing,
        lastIncompleteCheckout,
        addresses,
        orders,
        updatedAt,
        displayName,
        createdAt,
        defaultAddress,
    } = customer;
    return {
        id: id,
        email,
        firstName,
        lastName,
        displayName,
        phone,
        lastIncompleteCheckout,
        acceptsMarketing,
        orders: normalizeCustomerOrders(orders),
        addresses: addresses.edges.map((address) =>
            normalizeAddress(address.node)
        ),
        updatedAt,
        createdAt,
        defaultAddress: defaultAddress
            ? normalizeAddress(defaultAddress)
            : null,
    };
};
