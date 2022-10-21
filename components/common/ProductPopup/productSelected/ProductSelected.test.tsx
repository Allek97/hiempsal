import { render, screen, waitFor } from "@tests/customRender";
import { NextRouter } from "next/router";
import userEvent from "@testing-library/user-event";
import faker from "@faker-js/faker";

import { currencyMap } from "@framework/utils/optionMapping";
import { productOptions } from "../__mocks__/variables";
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
    currencyCode: faker.helpers.arrayElement(Object.keys(currencyMap)),
};

function renderProductSelected({
    props,
    routerOptions,
}: {
    props?: Partial<ProductSelectedProps>;
    routerOptions?: Partial<NextRouter>;
} = {}) {
    return {
        ...render(<ProductSelected {...defaultProps} {...props} />, {
            routerOptions: routerOptions,
        }),
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any

test("renders correctely", () => {
    const { productName } = defaultProps;
    const { price, image } = defaultProps.selectedVariant;

    renderProductSelected();

    expect(
        screen.getByText(RegExp(String.raw`${productName}`, "i"))
    ).toBeInTheDocument();
    expect(
        screen.getByText(new RegExp(String.raw`${price.toFixed(2)}`, "i"))
    ).toBeInTheDocument();
    expect(
        screen.getByAltText(`${image?.alt ?? "Selected product"}`)
    ).toBeInTheDocument();
});

test.only("user is redirected to cart page when clicking the view cart button", async () => {
    const { mockRouter } = renderProductSelected();

    const cartBtn = screen.getByRole("button", { name: /view cart/i });
    expect(cartBtn.closest("a")).toHaveAttribute("href", "/cart/bag");

    await userEvent.click(cartBtn);
    await waitFor(() => {
        expect(mockRouter.push).toHaveBeenCalledWith(
            "/cart/bag",
            "/cart/bag",
            expect.any(Object)
        );
    });
});

test("checkout button redirect to our checkout api", () => {
    renderProductSelected();

    const checkout = screen.getByText(/checkout/i);
    expect(checkout).toHaveAttribute("href", "/api/checkout");
});
