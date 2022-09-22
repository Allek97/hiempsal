/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";
import { ImageProps } from "next/image";
import { Swatch } from "..";
import { SwatchProps } from "./Swatch";

function renderSwatch(props?: Partial<SwatchProps>) {
    const defaultProps: SwatchProps = {
        clickHandler: () => {},
        value: faker.datatype.string(),
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

function renderWhenOutOfStock(option: string) {
    renderSwatch({
        isOutOfStock: true,
        option: option,
    });

    expect(screen.getByRole("alert")).toHaveTextContent(/get notified/i);
}

jest.mock("next/image", () => ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,

    default: ({ src, alt }: ImageProps) => {
        // eslint-disable-next-line jsx-a11y/alt-text
        return <img src={src as string} alt={alt} />;
    },
}));

describe("component renders correctly", () => {
    test("when the selected option is size or gender", () => {
        const randomOption = faker.random.arrayElement(["size", "gender"]);
        const { swatchProps } = renderSwatch({
            option: randomOption,
        });

        expect(screen.getByText(swatchProps.value)).toBeInTheDocument();
        const swatchInput = screen.getByRole("radio") as HTMLInputElement;
        expect(swatchInput.checked).toBe(swatchProps.isSelected);
        expect(swatchInput).toBeRequired();
        const spanEffect = screen.getByTestId("span-effect");
        expect(spanEffect).toBeInTheDocument();
    });
    test("when the selected option is color", () => {
        const randomColor = faker.commerce.color();
        const randomImgUrl = faker.image.fashion();
        const randomImgAlt = faker.lorem.lines(1);

        const { swatchProps } = renderSwatch({
            option: "color",
            value: randomColor,
            image: { url: randomImgUrl, alt: randomImgAlt },
        });

        expect(screen.getByText(swatchProps.value)).toBeInTheDocument();
        const swatchInput = screen.getByRole("radio") as HTMLInputElement;
        expect(swatchInput.checked).toBe(swatchProps.isSelected);
        expect(swatchInput).toBeRequired();
        const variantImage = screen.getByAltText(randomImgAlt);
        expect(variantImage).toBeInTheDocument();
        expect(variantImage.getAttribute("src")).toBe(randomImgUrl);
        expect(variantImage).toHaveAttribute("alt", randomImgAlt);
        const spanEffect = screen.getByTestId("span-effect");
        expect(spanEffect).toBeInTheDocument();
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
    await userEvent.click(swatchInput);

    expect(mockClickHandler).not.toHaveBeenCalled();
});

describe("notify when option is out of stock", () => {
    test("for option size or gender", () => {
        const randomOption = faker.random.arrayElement(["size", "gender"]);
        renderWhenOutOfStock(randomOption);
    });
    test("for option color", () => {
        renderWhenOutOfStock("color");
    });
});
