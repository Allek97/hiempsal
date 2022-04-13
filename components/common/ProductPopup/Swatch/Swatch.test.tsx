import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Swatch, { SwatchProps } from "./Swatch";

function renderSwatch(props?: Partial<SwatchProps>) {
    // FIX need to randomise the default props
    const defaultProps: SwatchProps = {
        clickHandler: () => {},
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

test("select optionName with it's value when clicked", async () => {
    const mockClickHandler = jest.fn();
    const {
        swatchProps: { option, value },
    } = renderSwatch({
        clickHandler: mockClickHandler,
    });

    const swatchInput = screen.getByRole("radio");
    await userEvent.click(swatchInput);

    expect(mockClickHandler).toHaveBeenCalledTimes(1);
    expect(mockClickHandler).toHaveBeenCalledWith(option, value);
});

test("can't select optionName with it's value when disabled", async () => {
    const mockClickHandler = jest.fn();
    // NOTE disabled when option is out of stock or unavailable

    // 1) option is not on stock for all variants
    const { swatchProps, rerender } = renderSwatch({
        isOutOfStock: true,
        clickHandler: mockClickHandler,
    });

    const swatchInput = screen.getByRole("radio");
    await userEvent.click(swatchInput);

    expect(mockClickHandler).not.toHaveBeenCalled();
    // 2) option is on stock but not available at that moment due to other selected options
    rerender(
        <Swatch {...swatchProps} isAvailable={false} isOutOfStock={false} />
    );

    await userEvent.click(swatchInput);

    expect(mockClickHandler).not.toHaveBeenCalled();
    // 3) option is out of stock and unavailable
    rerender(<Swatch {...swatchProps} isAvailable={false} isOutOfStock />);

    await userEvent.click(swatchInput);

    expect(mockClickHandler).not.toHaveBeenCalled();
});

test("notify when option is out of stock", () => {
    renderSwatch({ isOutOfStock: true });

    expect(screen.getByRole("alert")).toHaveTextContent(/get notified/i);
});
