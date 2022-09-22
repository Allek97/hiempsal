import { FC } from "react";
import Image from "next/image";
import { ProductImage } from "@framework/types/product";
import { MdAddAlert } from "react-icons/md";
import {
    ImageVariantWrapper,
    NotifyButton,
    ProductVariantColor,
    VariantOther,
} from "./Swatch.styled";

export interface SwatchProps {
    value: string;
    option: "size" | "color" | "gender" | string;
    image?: ProductImage | undefined;
    clickHandler: (optionName: string, value: string) => void;
    isAvailable: boolean;
    isOutOfStock: boolean;
    isSelected: boolean;
}

const placeHolder = "/product-image-placeholder.svg";

const defaultImage = {
    url: placeHolder,
    alt: "Variant of the product",
};

function NotifyComponent() {
    return (
        <NotifyButton type="button" role="alert">
            <MdAddAlert className="mr-0.5 h-3.5 w-3.5" /> Get notified
        </NotifyButton>
    );
}

const Swatch: FC<SwatchProps> = ({
    value,
    option,
    image = defaultImage,
    clickHandler,
    isAvailable,
    isOutOfStock,
    isSelected,
}) => {
    return option.toLowerCase() === "color" ||
        option.toLowerCase() === "watch band" ? (
        <ProductVariantColor
            className="capitalize"
            htmlFor={value}
            isAvailable={isAvailable}
            isOutOfStock={isOutOfStock}
            hasImage
            data-testid={`swatch-${option}`}
        >
            <input
                id={value}
                type="radio"
                name="color"
                required
                onClick={() => clickHandler(option, value)}
                defaultChecked={isSelected}
                disabled={isOutOfStock || !isAvailable}
            />
            <span data-testid="span-effect" />
            <ImageVariantWrapper>
                <Image
                    src={image?.url ?? "/product-pattern-bg.svg"}
                    alt={image?.alt ?? "Item variant color"}
                    width={2}
                    height={3}
                    layout="responsive"
                    objectFit="contain"
                    data-testid="variant-image"
                    priority
                    placeholder="blur"
                />
            </ImageVariantWrapper>
            <span>{value}</span>
            {isOutOfStock && <NotifyComponent />}
        </ProductVariantColor>
    ) : (
        <VariantOther
            className={option === "size" ? "uppercase" : "capitalize"}
            htmlFor={value}
            isAvailable={isAvailable}
            isOutOfStock={isOutOfStock}
            isPride={value.toLowerCase() === "genderfluid"}
            data-testid={`swatch-${option}`}
        >
            <input
                id={value}
                type="radio"
                name={option}
                required
                onClick={() => clickHandler(option, value)}
                defaultChecked={isSelected}
                disabled={isOutOfStock || !isAvailable}
            />
            <span data-testid="span-effect" />

            <span>{value}</span>
            {isOutOfStock && <NotifyComponent />}
        </VariantOther>
    );
};

Swatch.defaultProps = {
    image: defaultImage,
};

export default Swatch;
