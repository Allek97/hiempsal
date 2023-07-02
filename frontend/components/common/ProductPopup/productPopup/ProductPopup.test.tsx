import "whatwg-fetch";
import { render, screen } from "@tests/customRender";
import userEvent from "@testing-library/user-event";

import { VariantButtonPopup } from "@components/product";

import useAddItem from "@framework/cart/use-add-item";
import { checkoutServer } from "@mocks/api";
import { Choices } from "@components/common/helpers";

import { product as mockProduct } from "../__mocks__/variables";
import ProductPopup, { Props as ProductPopupProps } from "./ProductPopup";

// jest.mock("@framework/utils/fetch-api.ts");

jest.mock("@framework/cart/use-add-item");

beforeAll(() => checkoutServer.listen({ onUnhandledRequest: "error" }));
afterAll(() => checkoutServer.close());
afterEach(() => checkoutServer.resetHandlers());

const defaultProps: ProductPopupProps = {
    product: mockProduct,
};

function renderProductPopup(props?: Partial<ProductPopupProps>) {
    return {
        ...render(
            <>
                <ProductPopup {...defaultProps} {...props} />
                <VariantButtonPopup />
            </>
        ),
        mockDefaultProps: { ...defaultProps, ...props },
    };
}

test("adds selected variant to our checkout cart", async () => {
    /////////////////////////////////////////////////////////////////////
    // NOTE Arrange
    /////////////////////////////////////////////////////////////////////
    const mockUseAddItem = useAddItem as unknown as jest.Mock;
    const mockAddItem = jest.fn(
        async (input: { variantId: string; quantity: number }) =>
            input.variantId
    );
    mockUseAddItem.mockImplementation(() => mockAddItem);

    const { mockDefaultProps } = renderProductPopup();

    const { name: productName, variants } = mockDefaultProps.product;
    const { options, id: variantId, price, image } = variants[0];

    const customerOptions: Choices = Object.assign(
        {},
        ...options.map((option) => ({
            [option.displayName.toLowerCase()]: option.values[0].label,
        }))
    );

    const option1 = options[0].values[0].label;
    const option2 = options[1].values[0].label;
    const option3 = options[2].values[0].label;

    /////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////

    const variantBtn = screen.getByText(/Select Variant/i);
    await userEvent.click(variantBtn);
    expect(screen.getByTestId("product-cart")).toBeInTheDocument();

    // We make sure <ProductSelected/> is not rendered yet
    const productSelected = screen.queryByTestId("product-selected");
    expect(productSelected).not.toBeInTheDocument();

    const optionInput1 = screen.getByLabelText(
        new RegExp(String.raw`^${option1}$`, "i")
    );
    const optionInput2 = screen.getByLabelText(
        new RegExp(String.raw`^${option2}$`, "i")
    );
    const optionInput3 = screen.getByLabelText(
        new RegExp(String.raw`^${option3}$`, "i")
    );
    const cartBtn = screen.getByRole("button", { name: /A D D I N G/i });

    // choose a value for each option
    await userEvent.click(optionInput1);
    await userEvent.click(optionInput2);
    await userEvent.click(optionInput3);

    // add them to the cart
    await userEvent.click(cartBtn);

    expect(mockAddItem).toHaveBeenCalledWith({
        variantId: variantId,
        quantity: 1,
    });
    expect(mockAddItem).toHaveBeenCalledTimes(1);

    expect(await screen.findByTestId("product-selected")).toBeInTheDocument();

    // Make sure <ProductSelected /> displays the correct variant

    const displayName: string = Object.entries(customerOptions)
        .map(([key, value]) => {
            if (key === "color")
                return value.toLowerCase().split(" ").join("-");
            if (key === "size" || key === "ram") return value.toUpperCase();

            return value;
        })
        .join(", ");

    const variantName = `${productName} | ${displayName}`;
    const variantPrice = `${price.toFixed(2)}`;

    const variantTitleElement = screen.getByRole("heading", {
        name: new RegExp(String.raw`${variantName}`, "i"),
        level: 4,
    });
    const variantPriceHeader = screen.getByText(
        new RegExp(String.raw`${variantPrice}`, "i")
    );

    expect(variantTitleElement).toBeInTheDocument();
    expect(variantPriceHeader).toBeInTheDocument();
    expect(
        screen.getByAltText(image?.alt ?? "Selected product")
    ).toBeInTheDocument();
});
