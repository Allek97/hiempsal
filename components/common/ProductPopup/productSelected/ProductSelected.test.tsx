import faker from "@faker-js/faker";
import { currencyMap } from "@framework/utils/optionMapping";
import { render, act, screen } from "@tests/customRender";
import { productOptions } from "../tests/variables";
import ProductSelected, { ProductSelectedProps } from "./ProductSelected";

const defaultProps: ProductSelectedProps = {
    selectedVariant: {
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
    productName: faker.commerce.productName(),
    currencyCode: faker.random.arrayElement(Object.keys(currencyMap)),
};

function renderProductSelected(props?: Partial<ProductSelectedProps>) {
    return {
        ...render(<ProductSelected {...defaultProps} {...props} />),
    };
}

test("renders correctely", () => {
    const { productName, currencyCode } = defaultProps;
    const { price, image } = defaultProps.selectedVariant;

    renderProductSelected();

    expect(
        screen.getByText(RegExp(String.raw`${productName}`, "i"))
    ).toBeInTheDocument();
    expect(
        screen.getByText(`${currencyMap[currencyCode]}${price}`)
    ).toBeInTheDocument();
    expect(
        screen.getByAltText(`${image?.alt ?? "Selected product"}`)
    ).toBeInTheDocument();
});
