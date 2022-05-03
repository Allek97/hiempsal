import "whatwg-fetch";
import { render, screen, waitFor, act } from "@tests/customRender";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { VariantButtonPopup } from "@components/product";

import { colorMap, currencyMap } from "@framework/utils/optionMapping";

import useAddItem from "@framework/cart/use-add-item";
import { checkoutServer } from "@mocks/api";
import { product as productMock } from "../__mocks__/variables";
import ProductPopup, { Props as ProductPopupProps } from "./ProductPopup";
import { Choices } from "../helpers";

// jest.mock("@framework/utils/fetch-api.ts");

jest.mock("@framework/cart/use-add-item");

beforeAll(() => checkoutServer.listen({ onUnhandledRequest: "error" }));
afterAll(() => checkoutServer.close());
afterEach(() => checkoutServer.resetHandlers());

const defaultProps: ProductPopupProps = {
    product: productMock,
};

function renderProductPopup(props?: Partial<ProductPopupProps>) {
    return {
        ...render(
            <>
                <ProductPopup {...defaultProps} {...props} />
                <VariantButtonPopup />
            </>
        ),
    };
}

test.only("adds selected variant to our checkout cart", async () => {
    const {
        name: productName,
        variants,
        price: { currencyCode },
    } = productMock;
    const { options, id: variantId, price, image } = variants[0];

    const selectedOptions: Choices = Object.assign(
        {},
        ...options.map((option) => ({
            [option.displayName.toLowerCase()]: option.values[0].label,
        }))
    );

    const color =
        colorMap[
            options.filter((option) => option.displayName === "color")[0]
                .values[0].label
        ];
    const size = options.filter((option) => option.displayName === "size")[0]
        .values[0].label;

    const gender = options.filter(
        (option) => option.displayName === "gender"
    )[0].values[0].label;

    const mockUseAddItem = useAddItem as unknown as jest.Mock;
    const mockAddItem = jest.fn(
        async (input: { variantId: string; quantity: number }) =>
            input.variantId
    );
    mockUseAddItem.mockImplementation(() => mockAddItem);

    await renderProductPopup();

    const variantBtn = screen.getByText(/Select Variant/i);
    await userEvent.click(variantBtn);
    expect(screen.getByTestId("product-cart")).toBeInTheDocument();

    // We make sure <ProductSelected/> is not rendered yet
    const productSelected = screen.queryByTestId("product-selected");
    expect(productSelected).not.toBeInTheDocument();

    const colorInput = screen.getByLabelText(
        new RegExp(String.raw`^${color}$`, "i")
    );
    const sizeInput = screen.getByLabelText(
        new RegExp(String.raw`^${size}$`, "i")
    );
    const genderInput = screen.getByLabelText(
        new RegExp(String.raw`^${gender}$`, "i")
    );
    const cartBtn = screen.getByRole("button", { name: /A D D I N G/i });

    // choose a value for each option
    await userEvent.click(colorInput);
    await userEvent.click(sizeInput);
    await userEvent.click(genderInput);

    // add them to the cart
    await userEvent.click(cartBtn);

    expect(mockAddItem).toHaveBeenCalledWith({
        variantId: variantId,
        quantity: 1,
    });

    await waitFor(() => {
        expect(screen.getByTestId("product-selected")).toBeInTheDocument();
    });

    // Make sure <ProductSelected /> displays the correct variant

    const variantName = `${productName} | 
    ${colorMap[selectedOptions.color ?? selectedOptions.colour]
        .toLowerCase()
        .split(" ")
        .join("-")}
    , ${selectedOptions.size.toUpperCase()}, 
    ${selectedOptions.gender}`;

    const variantPrice = `${currencyMap[currencyCode]}${price}`;

    const variantTitle = screen.getByText(
        new RegExp(String.raw`${variantName}`, "i")
    );
    const variantPriceHeader = screen.getByText(variantPrice);

    expect(variantTitle).toBeInTheDocument();
    expect(variantPriceHeader).toBeInTheDocument();
    expect(
        screen.getByAltText(image?.alt ?? "Selected product")
    ).toBeInTheDocument();
});
