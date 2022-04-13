import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Swatch, { SwatchProps } from "./Swatch";

function renderSwatch(props?: Partial<SwatchProps>) {
    const defaultProps: SwatchProps = {
        clickHandler: (_e) => {},
        value: "M",
        isAvailable: false,
        isOutOfStock: false,
        isSelected: false,
        option: "size",
    };

    return {
        ...render(<Swatch {...defaultProps} {...props} />),
        swatchObject: { ...defaultProps, ...props },
    };
}

test("make sure all the elements render correctly", () => {
    const { swatchObject } = renderSwatch();

    expect(screen.getByText(swatchObject.value)).toBeInTheDocument();
    const swatchInput = screen.getByRole("radio") as HTMLInputElement;
    expect(swatchInput.checked).toBe(swatchObject.isSelected);
    expect(swatchInput).toBeRequired();
});

test("select option when clicked", () => {
    renderSwatch({ isSelected: false });

    const swatchInput = screen.getByRole("radio") as HTMLInputElement;
    userEvent.click(swatchInput);

    expect(swatchInput).toBeChecked();
});

test("show when option is out of stock", () => {
    renderSwatch({ isOutOfStock: true });

    expect(screen.getByRole("alert")).toHaveTextContent(/get notified/i);
});
