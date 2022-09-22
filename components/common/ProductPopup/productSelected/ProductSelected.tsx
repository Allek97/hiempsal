import { FC, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

import { useUI } from "@components/ui/context";

import { ProductVariant } from "@framework/types/product";

import { FunctionalLink } from "@components/utils";
import { currencyMap } from "@framework/utils/optionMapping";

import { Choices } from "@components/common/helpers";

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
    const selectedOptions: Choices = useMemo(
        () =>
            Object.assign(
                {},
                ...options.map((option) => ({
                    [option.displayName.toLowerCase()]: option.values[0].label,
                }))
            ),
        [options]
    );

    const displayName: string = useMemo(() => {
        const queryStr = Object.entries(selectedOptions).map(([key, value]) => {
            if (key === "color")
                return value.toLowerCase().split(" ").join("-");
            if (key === "size" || key === "ram") return value.toUpperCase();

            return value;
        });

        return queryStr.join(", ");
    }, [selectedOptions]);

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
                        placeholder="blur"
                    />
                </ImageWrapper>
                <div>
                    <h4>
                        {productName} | {displayName}
                    </h4>
                    <span>
                        {currencyMap[currencyCode]}
                        {price.toFixed(2)}
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
