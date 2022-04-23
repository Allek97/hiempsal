import { render, act, screen } from "@tests/customRender";
import useAddItem from "@framework/cart/use-add-item";

import { faker } from "@faker-js/faker";

import { ProductOption, ProductVariant } from "@framework/types/product";

import Close from "@components/icons/Close";
import { currencyMap } from "@framework/utils/optionMapping";
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

jest.mock("@framework/cart/use-add-item");

test.only("renders correctly", async () => {
    // FIX : https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
    const mockUseAddItem = useAddItem as unknown as jest.Mock;
    mockUseAddItem.mockImplementation(() => {});

    await act(async () => mockUseAddItem());

    const {
        product: { name, price },
    } = defaultProps;
    const randomCurrency = faker.random.arrayElement(Object.keys(currencyMap));

    renderProductCart({
        product: {
            ...defaultProps.product,
            price: { currencyCode: randomCurrency, value: price.value },
        },
    });

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(
        screen.getByText(`${currencyMap[randomCurrency]}${price.value}`)
    ).toBeInTheDocument();
});
