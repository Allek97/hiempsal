import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { useUI } from "@components/ui/context";

import { ProductVariant } from "@framework/types/product";

import { FunctionalLink } from "@components/utils";
import { currencyMap } from "@framework/utils/optionMapping";

import { Choices } from "../helpers";

import {
    ProductInfo,
    Root,
    ImageWrapper,
    UtilBtn,
    UtilWrapper,
} from "./ProductSelected.styled";

export interface ProductSelectedProps {
    selectedVariant: ProductVariant;
    productName: string;
    currencyCode: "USD" | "EUR" | "CAD" | string;
}

const ProductSelected: FC<ProductSelectedProps> = ({
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
    const { setProductNotAdded } = useUI();

    return (
        <Root data-testid="product-selected">
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
                        {(selectedOptions.color ?? selectedOptions.colour)
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
                <Link href="/cart/bag" passHref>
                    <FunctionalLink onClick={setProductNotAdded}>
                        <UtilBtn type="button" isHoverActive={false} $isCartBtn>
                            View Cart
                        </UtilBtn>
                    </FunctionalLink>
                </Link>

                <UtilBtn Component="a" href="/api/checkout">
                    Checkout
                </UtilBtn>
            </UtilWrapper>
        </Root>
    );
};

export default ProductSelected;
