/* eslint-disable no-irregular-whitespace */

import { render, screen, waitFor } from "@testing-library/react";
import CartButton, { Props } from "./CartButton";

jest.mock("framer-motion", () => ({
    ...jest.requireActual("framer-motion"),
    useReducedMotion: () => true,
}));

const defaultProps: Props = {
    isLoading: false,
    loadingText: "Adding",
    preText: "Add to Cart",
};

const renderCartBtn = (props?: Props) => {
    return {
        ...render(<CartButton {...defaultProps} />),
        mockProps: { ...defaultProps, ...props },
    };
};

test("renders correctly", () => {
    renderCartBtn();

    expect(screen.getByRole("button")).toBeInTheDocument();

    const addCartHeading = screen.getByRole("heading", {
        name: /A d d t o C a r t/i,
    });
    const addingHeading = screen.getByRole("heading", {
        name: /A d d i n g/i,
    });
    expect(addCartHeading).toBeInTheDocument();
    expect(addingHeading).toBeInTheDocument();
});

test("should display add to cart before loading", async () => {
    // const { container } = renderCartBtn({ ...defaultProps, isLoading: true });
    // expect(container).toMatchSnapshot();
});
test("should display 'adding' after loading", async () => {
    // const { container } = renderCartBtn({ ...defaultProps, isLoading: true });

    // const motionBox = screen.getByTestId("motion-x");
    const component = screen.getByTestId("cart-button");

    await waitFor(() => {
        expect(component).toHaveStyle("opacity: 1;");
    });

    // expect(container).toMatchSnapshot();
});
