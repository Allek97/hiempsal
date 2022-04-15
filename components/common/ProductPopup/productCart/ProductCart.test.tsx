import { render } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import {
    Product,
    ProductOption,
    ProductVariant,
} from "@framework/types/product";
import ProductCart, { ProductCartProps } from "./ProductCart";

function renderProductCart(props?: Partial<Product>) {
    const productOptions: ProductOption[] = [
        {
            id: faker.datatype.uuid(),
            displayName: faker.commerce.productMaterial(),
            values: [{ label: faker.commerce.productMaterial() }],
        },
    ];
    const productVariants: ProductVariant[] = [
        {
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            sku: faker.datatype.uuid(),
            image: { url: faker.image.fashion(), alt: faker.image.fashion() },
            price: faker.datatype.number(),
            listPrice: faker.datatype.number(),
            requiresShipping: faker.datatype.boolean(),
            availableForSale: faker.datatype.boolean(),
            options: productOptions,
        },
    ];
    const defaultProps: ProductCartProps = {
        product: {
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            vendor: faker.company.companyName(),
            description: faker.commerce.productDescription(),
            path: faker.datatype.string(),
            slug: faker.datatype.string(),
            images: [
                { url: faker.image.fashion(), alt: faker.image.fashion() },
            ],
            price: {
                currencyCode: faker.finance.currencySymbol(),
                value: faker.datatype.number(),
            },
            availableForSale: faker.datatype.boolean(),
            featureImages: [
                { url: faker.image.fashion(), alt: faker.image.fashion() },
            ],
            options: productOptions,
            variants: productVariants,
        },
        setSelectedVariant: () => {},
    };

    return {
        ...render(<ProductCart {...defaultProps} {...props} />),
        ProductCartProps: { ...defaultProps, ...props },
    };
}

test.only("renders correctly", () => {
    const { debug } = renderProductCart();
});
