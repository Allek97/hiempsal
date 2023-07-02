/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";
import { ImageProps } from "next/image";
import Swatch, { SwatchProps } from "./Swatch";

const defaultProps: SwatchProps = {
    clickHandler: () => {},
    value: faker.datatype.string(),
    isAvailable: true,
    isOutOfStock: false,
    isSelected: false,
    option: "size",
};

function renderSwatch(props?: Partial<SwatchProps>) {
    return {
        ...render(<Swatch {...defaultProps} {...props} />),
        swatchProps: { ...defaultProps, ...props },
    };
}

jest.mock("next/image", () => ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,

    default: ({ src, alt }: ImageProps) => {
        // eslint-disable-next-line jsx-a11y/alt-text
        return <img src={src as string} alt={alt} />;
    },
}));

function assertRender(props?: SwatchProps) {
    const { swatchProps } = renderSwatch(props);

    expect(screen.getByText(swatchProps.value)).toBeInTheDocument();

    const swatchInput = screen.getByRole("radio") as HTMLInputElement;
    expect(swatchInput.checked).toBe(swatchProps.isSelected);
    expect(swatchInput).toBeRequired();
    expect(swatchInput).not.toBeDisabled();

    const spanEffect = screen.getByTestId("span-effect");
    expect(spanEffect).toBeInTheDocument();
}

describe("component renders correctly", () => {
    test("when the selected option is any option but color or watch band", () => {
        const randomOption = faker.helpers.arrayElement([
            "size",
            "gender",
            faker.commerce.productAdjective(),
        ]);
        assertRender({
            ...defaultProps,
            option: randomOption,
        });
    });
    test("when the selected option is color or watch band", () => {
        const randomValue = faker.commerce.productMaterial();
        const randomImgUrl = faker.image.fashion();
        const randomImgAlt = faker.lorem.lines(1);

        assertRender({
            ...defaultProps,
            option: faker.helpers.arrayElement(["color", "watch band"]),
            value: randomValue,
            image: { url: randomImgUrl, alt: randomImgAlt },
        });

        const variantImage = screen.getByAltText(randomImgAlt);
        expect(variantImage).toBeInTheDocument();
        expect(variantImage.getAttribute("src")).toBe(randomImgUrl);
        expect(variantImage).toHaveAttribute("alt", randomImgAlt);
    });
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

test("can't select value of a certain option when it's out of stock", async () => {
    const mockClickHandler = jest.fn();

    renderSwatch({
        isOutOfStock: true,
        clickHandler: mockClickHandler,
    });

    const swatchInput = screen.getByRole("radio");
    expect(swatchInput).toBeDisabled();
    await userEvent.click(swatchInput);

    expect(mockClickHandler).not.toHaveBeenCalled();
});
test("can't select value of a certain option when it's unavailable", async () => {
    const mockClickHandler = jest.fn();

    renderSwatch({
        isAvailable: false,
        clickHandler: mockClickHandler,
    });

    const swatchInput = screen.getByRole("radio");
    expect(swatchInput).toBeDisabled();
    await userEvent.click(swatchInput);

    expect(mockClickHandler).not.toHaveBeenCalled();
});

function assertOutOfStock(optionName: string) {
    const { swatchProps } = renderSwatch({
        ...defaultProps,
        isOutOfStock: true,
        option: optionName,
    });
    const { value } = swatchProps;
    expect(screen.getByRole("alert")).toHaveTextContent(/get notified/i);
    expect(screen.getByLabelText(value)).toBeDisabled();
}

describe("notify when option is out of stock", () => {
    test("for option size or gender", () => {
        const randomOption = faker.helpers.arrayElement(["size", "gender"]);
        assertOutOfStock(randomOption);
    });
    test("for option color", () => {
        assertOutOfStock("color");
    });
});
