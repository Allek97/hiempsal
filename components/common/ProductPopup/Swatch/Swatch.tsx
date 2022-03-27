import { FC, MouseEvent } from "react";
import Image from "next/image";
import { ProductImage } from "@framework/types/product";
import { colorKeys } from "@lib/option";
import {
    ImageVariantWrapper,
    NotifyButton,
    ProductVariantColor,
    VariantSizeGender,
} from "./Swatch.styled";

interface Props {
    value: string;
    option: "size" | "color" | "gender" | string;
    image?: ProductImage | undefined;
    // eslint-disable-next-line no-unused-vars
    clickHandler: (e: MouseEvent<HTMLInputElement>) => void;
    isAvailable: boolean;
    isOutOfStock: boolean;
    isSelected: boolean;
}

const placeHolder = "/product-image-placeholder.svg";

const defaultImage = {
    url: placeHolder,
    alt: "Variant of the product",
};

const Swatch: FC<Props> = ({
    value,
    option,
    image = defaultImage,
    clickHandler,
    isAvailable,
    isOutOfStock,
    isSelected,
}) => {
    return option === "color" ? (
        <ProductVariantColor
            className="capitalize"
            htmlFor={value}
            isAvailable={isAvailable}
            isOutOfStock={isOutOfStock}
            hasImage
        >
            <input
                id={value}
                type="radio"
                name="color"
                required
                onClick={clickHandler}
                defaultChecked={isSelected}
                disabled={isOutOfStock || !isAvailable}
            />
            <span />
            <ImageVariantWrapper>
                <Image
                    src={image?.url ?? "/product-pattern-bg.svg"}
                    alt={image?.alt ?? "Item variant color"}
                    width={2}
                    height={3}
                    layout="responsive"
                    objectFit="contain"
                    priority
                />
            </ImageVariantWrapper>
            <span>{colorKeys[value]}</span>
            {isOutOfStock && <button type="button">OUT OF STOCK</button>}
        </ProductVariantColor>
    ) : (
        <VariantSizeGender
            className={option === "size" ? "uppercase" : "capitalize"}
            htmlFor={value}
            isAvailable={isAvailable}
            isOutOfStock={isOutOfStock}
            isPride={value.toLowerCase() === "genderfluid"}
        >
            <input
                id={value}
                type="radio"
                name={option}
                required
                onClick={clickHandler}
                defaultChecked={isSelected}
                disabled={isOutOfStock || !isAvailable}
            />
            <span />

            <span>{value}</span>
            {isOutOfStock && (
                <NotifyButton type="button">Get notified</NotifyButton>
            )}
        </VariantSizeGender>
    );
};

Swatch.defaultProps = {
    image: defaultImage,
};

export default Swatch;
