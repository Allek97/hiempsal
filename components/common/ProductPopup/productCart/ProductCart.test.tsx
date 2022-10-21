import { render, screen } from "@tests/customRender";
import userEvent from "@testing-library/user-event";
import useAddItem from "@framework/cart/use-add-item";

import { currencyMap } from "@framework/utils/optionMapping";

import ProductCart, { ProductCartProps } from "./ProductCart";
import { defaultProps } from "../__mocks__/variables";

function renderProductCart(props?: Partial<ProductCartProps>) {
    return {
        ...render(<ProductCart {...defaultProps} {...props} />),
        mockProps: { ...defaultProps, ...props },
    };
}

jest.mock("@framework/cart/use-add-item");

test("renders correctly", async () => {
    const { mockProps } = renderProductCart();

    const {
        product: {
            name,
            price: { currencyCode, value },
            options,
        },
    } = mockProps;

    expect(screen.getByText(name)).toBeInTheDocument();

    expect(
        screen.getByText(`${currencyMap[currencyCode]}${value}`)
    ).toBeInTheDocument();

    expect(screen.getByTestId("close-wrapper")).toBeInTheDocument();

    const optionInput1 = screen.getByLabelText(
        RegExp(String.raw`^${options[0].values[0].label}$`, "i")
    );

    const optionInput2 = screen.getByLabelText(
        RegExp(String.raw`^${options[1].values[0].label}$`, "i")
    );

    const optionInput3 = screen.getByLabelText(
        RegExp(String.raw`^${options[2].values[0].label}$`, "i")
    );

    expect(optionInput1).toBeInTheDocument();
    expect(optionInput1).toBeRequired();

    expect(optionInput2).toBeInTheDocument();
    expect(optionInput2).toBeRequired();

    expect(optionInput3).toBeInTheDocument();
    expect(optionInput3).toBeRequired();

    expect(
        screen.getByText(`Select ${options[0].displayName.toLowerCase()}`)
    ).toBeInTheDocument();
    expect(
        screen.getByText(`Select ${options[1].displayName.toLowerCase()}`)
    ).toBeInTheDocument();
    expect(
        screen.getByText(`Select ${options[2].displayName.toLowerCase()}`)
    ).toBeInTheDocument();

    expect(
        screen.getByText(/Delivery time: 5-7 business days/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/100-day return period/i)).toBeInTheDocument();
    expect(screen.getByText(/Free returns/i)).toBeInTheDocument();
    expect(
        screen.getByText(/FREE SHIPPING FROM \$50.00 CAD/i)
    ).toBeInTheDocument();

    expect(screen.getByTestId("cart-button")).toHaveTextContent(
        /Add to Cart Adding/i
    );
});

test("show warning sign when options are not selected", async () => {
    //////////////////////////////////////////////////////////////////
    // NOTE ARRANGE
    //////////////////////////////////////////////////////////////////
    const mockUseAddItem = useAddItem as unknown as jest.Mock;
    const mockAddItem = jest.fn(
        async (input: { variantId: string; quantity: number }) =>
            input.variantId
    );
    mockUseAddItem.mockImplementation(() => mockAddItem);

    //////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////

    const { mockProps } = renderProductCart();
    const {
        product: { options },
    } = mockProps;

    const optionInput1 = screen.getByLabelText(
        RegExp(String.raw`^${options[0].values[0].label}$`, "i")
    );

    const optionInput2 = screen.getByLabelText(
        RegExp(String.raw`^${options[1].values[0].label}$`, "i")
    );

    const optionInput3 = screen.getByLabelText(
        RegExp(String.raw`^${options[2].values[0].label}$`, "i")
    );

    const cartButton = screen.getByRole("button", {
        name: /A d d t o C a r t/i,
    });

    await userEvent.click(cartButton);
    expect(screen.getAllByRole("alert")).toHaveLength(3);

    await userEvent.click(optionInput1);
    await userEvent.click(cartButton);
    expect(screen.getAllByRole("alert")).toHaveLength(2);

    await userEvent.click(optionInput3);
    await userEvent.click(cartButton);
    expect(screen.getAllByRole("alert")).toHaveLength(1);

    await userEvent.click(optionInput2);
    await userEvent.click(cartButton);
    expect(screen.queryAllByRole("alert")).toHaveLength(0);
});
