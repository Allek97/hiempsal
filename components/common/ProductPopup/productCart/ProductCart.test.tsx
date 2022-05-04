import { render, act, screen } from "@tests/customRender";
import useAddItem from "@framework/cart/use-add-item";

import { faker } from "@faker-js/faker";

import { currencyMap } from "@framework/utils/optionMapping";

import ProductCart, { ProductCartProps } from "./ProductCart";
import { defaultProps, productOptions } from "../__mocks__/variables";

function renderProductCart(props?: Partial<ProductCartProps>) {
    return {
        ...render(<ProductCart {...defaultProps} {...props} />),
    };
}

jest.mock("@framework/cart/use-add-item");

test("renders correctly", async () => {
    // FIX : https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
    const mockUseAddItem = useAddItem as unknown as jest.Mock;
    mockUseAddItem.mockImplementation(() => {});

    await act(async () => mockUseAddItem());

    const {
        product: { name, price },
    } = defaultProps;
    const randomCurrency = faker.random.arrayElement(Object.keys(currencyMap));
    const color = productOptions[0].values[0].label;

    renderProductCart({
        product: {
            ...defaultProps.product,
            price: { currencyCode: randomCurrency, value: price.value },
        },
    });

    expect(screen.getByText(name)).toBeInTheDocument();

    expect(
        screen.getByText(`${currencyMap[randomCurrency]}${price.value}`)
    ).toBeInTheDocument();

    expect(screen.getByTestId("close-wrapper")).toBeInTheDocument();

    expect(
        screen.getByText(RegExp(String.raw`^${color}$`, "i"))
    ).toBeInTheDocument();
    expect(
        screen.getByText(
            RegExp(String.raw`^${productOptions[1].values[0].label}$`, "i")
        )
    ).toBeInTheDocument();
    expect(
        screen.getByText(
            RegExp(String.raw`^${productOptions[2].values[0].label}$`, "i")
        )
    ).toBeInTheDocument();

    expect(
        screen.getByText(`Select ${productOptions[0].displayName}`)
    ).toBeInTheDocument();
    expect(
        screen.getByText(`Select ${productOptions[1].displayName}`)
    ).toBeInTheDocument();
    expect(
        screen.getByText(`Select ${productOptions[2].displayName}`)
    ).toBeInTheDocument();

    expect(
        screen.getByText(/Delivery time: 5-7 business days/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/100-day return period/i)).toBeInTheDocument();
    expect(screen.getByText(/Free returns/i)).toBeInTheDocument();
    expect(
        screen.getByText(/FREE SHIPPING FROM \$50.00 CAD/i)
    ).toBeInTheDocument();

    expect(screen.getByTestId("cart-button")).toBeInTheDocument();
});
