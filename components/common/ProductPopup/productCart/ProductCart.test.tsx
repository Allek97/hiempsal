import { render, act, screen } from "@tests/customRender";

import { faker } from "@faker-js/faker";

import { ProductOption, ProductVariant } from "@framework/types/product";

import ProductCart, { ProductCartProps } from "./ProductCart";

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
        images: [{ url: faker.image.fashion(), alt: faker.image.fashion() }],
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

function renderProductCart(props?: Partial<ProductCartProps>) {
    return {
        ...render(<ProductCart {...defaultProps} {...props} />),
    };
}

test.only("renders correctly", async () => {
    // const promise = Promise.resolve();

    renderProductCart({ product: { ...defaultProps.product, name: "asd" } });

    expect(screen.getByText("asd")).toBeInTheDocument();

    await act(async () => {});
});
