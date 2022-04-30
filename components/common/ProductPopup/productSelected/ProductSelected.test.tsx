import { render, screen, waitFor, fireEvent } from "@tests/customRender";
import { NextRouter } from "next/router";
import userEvent from "@testing-library/user-event";
import faker from "@faker-js/faker";

import { currencyMap } from "@framework/utils/optionMapping";
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

function renderProductSelected(
    props?: Partial<ProductSelectedProps>,
    routerOptions?: Partial<NextRouter>
) {
    return {
        ...render(
            <ProductSelected {...defaultProps} {...props} />,
            undefined,
            routerOptions
        ),
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any

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

test("redirected to cart page when clicking to cart button", async () => {
    const { mockRouter } = renderProductSelected(undefined, {
        push: jest.fn().mockResolvedValue(true),
    });

    const cartBtn = screen.getByRole("button", { name: /view cart/i });
    expect(cartBtn.closest("a")).toHaveAttribute("href", "/cart/bag");

    userEvent.click(cartBtn);
    waitFor(() => {
        expect(mockRouter.push).toHaveBeenCalledWith(
            "/cart/bag",
            "/cart/bag",
            expect.any(Object)
        );
    });
});
