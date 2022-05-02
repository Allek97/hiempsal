import "whatwg-fetch";
import { render, screen, waitFor, act } from "@tests/customRender";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { VariantButtonPopup } from "@components/product";

import { colorMap } from "@framework/utils/optionMapping";

import useAddItem from "@framework/cart/use-add-item";
import { product as productMock } from "../__mocks__/variables";
import ProductPopup, { Props as ProductPopupProps } from "./ProductPopup";

jest.mock("@framework/utils/fetch-api.ts");
jest.mock("@framework/cart/use-add-item");

const server = setupServer(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    rest.post(
        "https://hiempsal.myshopify.com/api/2022-01/graphql.json",
        (req, res, ctx) => {
            return res(ctx.json({ firstName: "John" }));
        }
    )
);
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

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
    const { variants } = productMock;
    const { options } = variants[0];

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
    mockUseAddItem.mockImplementation(
        () => (input: { variantId: string; quantity: number }) => input
    );

    const { debug } = await renderProductPopup();

    debug();

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

    // debug(colorInput);
    // add them to the cart
    await userEvent.click(cartBtn);

    expect(useAddItem).toHaveBeenCalled();
    // userEvent.click(div);

    // await waitFor(() => {
    //     expect(screen.getByTestId("product-selected")).toBeInTheDocument();
    // });

    debug();
});
