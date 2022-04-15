/* eslint-disable no-irregular-whitespace */
import { render, screen, waitFor } from "@testing-library/react";
import CartButton from "./CartButton";

jest.mock("framer-motion", () => ({
    ...jest.requireActual("framer-motion"),
    useReducedMotion: () => true,
}));

test("renders correctly", () => {
    render(<CartButton />);

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
    const { container } = render(<CartButton isLoading />);

    expect(container).toMatchSnapshot();
});
test("should display adding after loading", async () => {
    const { container } = render(<CartButton isLoading />);

    const motionBox = screen.getByTestId("motion-x");

    await waitFor(() => {
        expect(motionBox).toHaveStyle(
            "transform: translateX(calc(-75% - 30px)) translateZ(0);"
        );
    });

    expect(container).toMatchSnapshot();
});
