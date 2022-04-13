import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Swatch, { SwatchProps } from "./Swatch";

function renderSwatch(props?: Partial<SwatchProps>) {
    const defaultProps: SwatchProps = {
        clickHandler: () => {
            console.log("asdasd");
        },
        value: "M",
        isAvailable: true,
        isOutOfStock: false,
        isSelected: false,
        option: "size",
    };

    return {
        ...render(<Swatch {...defaultProps} {...props} />),

        swatchProps: { ...defaultProps, ...props },
    };
}

test("make sure all the elements render correctly", () => {
    const { swatchProps } = renderSwatch();

    expect(screen.getByText(swatchProps.value)).toBeInTheDocument();
    const swatchInput = screen.getByRole("radio") as HTMLInputElement;
    expect(swatchInput.checked).toBe(swatchProps.isSelected);
    expect(swatchInput).toBeRequired();
});

test("notify when option is out of stock", () => {
    renderSwatch({ isOutOfStock: true });

    expect(screen.getByRole("alert")).toHaveTextContent(/get notified/i);
});

test.only("select option when clicked", async () => {
    const mockClickHandler = jest.fn();
    const { debug } = renderSwatch({
        isSelected: true,
        isAvailable: true,
        isOutOfStock: false,
        clickHandler: mockClickHandler,
    });
    mockClickHandler.mockResolvedValueOnce({ isCalled: true });

    const swatchInput = screen.getByRole("radio");
    await userEvent.click(swatchInput);

    expect(mockClickHandler).toHaveBeenCalledTimes(1);
});
