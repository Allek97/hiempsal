import { ButtonHTMLAttributes, FC } from "react";
import Image from "next/image";
import { ProductImage } from "@framework/types/product";
import { colorKeys } from "@lib/option";
import {
    ImageVariantWrapper,
    ProductVariantColor,
    VariantSizeGender,
} from "./Swatch.styled";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
    option: "size" | "color" | "gender" | string;
    image?: ProductImage | undefined;
    isActive?: boolean;
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
    isActive = false,
    ...rest
}) => {
    return (
        <button type="button" {...rest}>
            {option === "color" ? (
                <ProductVariantColor
                    isSelected={isActive}
                    key={value}
                    className="capitalize"
                >
                    <input id={value} type="radio" name="color" required />

                    <ImageVariantWrapper>
                        <Image
                            src={image?.url ?? "/product-pattern-bg.svg"}
                            alt={image?.alt ?? "Item variant color"}
                            width={3}
                            height={5}
                            layout="responsive"
                            objectFit="contain"
                            priority
                        />
                    </ImageVariantWrapper>

                    <span>{colorKeys[value]}</span>
                </ProductVariantColor>
            ) : (
                <VariantSizeGender
                    isSelected={isActive}
                    key={value}
                    className={option === "size" ? "uppercase" : "capitalize"}
                    htmlFor={value}
                >
                    <input id={value} type="radio" name="size" required />
                    {value}
                </VariantSizeGender>
            )}
        </button>
    );
};

Swatch.defaultProps = {
    image: defaultImage,
    isActive: false,
};

export default Swatch;
