import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductVariant } from "@framework/types/product";
import { colorMap, currencyMap } from "@framework/utils/optionMapping";
import { FunctionalLink } from "@components/utils";
import {
    ProductInfo,
    Root,
    ImageWrapper,
    UtilBtn,
    UtilWrapper,
} from "./ProductSelected.styled";
import { Choices } from "../helpers";

interface Props {
    selectedVariant: ProductVariant;
    productName: string;
    currencyCode: "USD" | "EUR" | "CAD" | string;
}

const ProductSelected: FC<Props> = ({
    selectedVariant,
    productName,
    currencyCode,
}) => {
    const { price, image, options } = selectedVariant;
    const selectedOptions: Choices = Object.assign(
        {},
        ...options.map((option) => ({
            [option.displayName.toLowerCase()]: option.values[0].label,
        }))
    );

    return (
        <Root>
            <ProductInfo>
                <ImageWrapper>
                    <Image
                        src={image?.url ?? "/product-image-placeholder.svg"}
                        alt={image?.alt ?? "Selected product"}
                        layout="responsive"
                        width={3}
                        height={3}
                        objectFit="contain"
                        priority
                    />
                </ImageWrapper>
                <div>
                    <h4>
                        {productName} |{" "}
                        {colorMap[
                            selectedOptions.color ?? selectedOptions.colour
                        ]
                            .toLowerCase()
                            .split(" ")
                            .join("-")}
                        , {selectedOptions.size.toUpperCase()},{" "}
                        {selectedOptions.gender}
                    </h4>
                    <span>
                        {currencyMap[currencyCode]}
                        {price}
                    </span>
                </div>
            </ProductInfo>
            <UtilWrapper>
                <div className="w-full">
                    <Link href="/cart/bag" passHref>
                        <FunctionalLink>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}

                            <UtilBtn
                                type="button"
                                isHoverActive={false}
                                $isCartBtn
                            >
                                View Cart
                            </UtilBtn>
                        </FunctionalLink>
                    </Link>
                </div>

                <UtilBtn type="button">Checkout</UtilBtn>
            </UtilWrapper>
        </Root>
    );
};

export default ProductSelected;
