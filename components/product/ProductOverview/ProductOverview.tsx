import { FC } from "react";
import Image from "next/image";

import { Plus } from "@components/icons";

import { ProductImage, ProductPrice } from "@framework/types/product";

import { currencyMap } from "@framework/utils/optionMapping";

import {
    ActionButton,
    ImageWrapper,
    ProductAction,
    ProductInfo,
    Root,
} from "./ProductOverview.styled";

interface Props {
    productImage: ProductImage;
    productName: string;
    productPrice: ProductPrice;
}

const ProductOverview: FC<Props> = ({
    productName,
    productPrice,
    productImage,
}) => {
    return (
        <Root>
            <button type="button" className="flex items-center w-full">
                <ImageWrapper>
                    <Image
                        src={
                            productImage.url ?? "/product-image-placeholder.svg"
                        }
                        alt={productImage.alt ?? productName ?? "product"}
                        layout="responsive"
                        height={3}
                        width={3}
                        objectFit="contain"
                    />
                </ImageWrapper>
                <ProductInfo>
                    <h3>{productName}</h3>
                    <span
                        className="flex text-grey"
                        style={{ marginTop: "0.1em" }}
                    >
                        {currencyMap[productPrice.currencyCode]}
                        {productPrice.value}
                    </span>
                </ProductInfo>
            </button>
            <div className="relative flex items-center justify-end w-full h-full">
                <ProductAction>
                    <ActionButton type="button">
                        <span>
                            <Plus />
                            <span>Select Variant</span>
                        </span>
                    </ActionButton>
                </ProductAction>
            </div>
        </Root>
    );
};

export default ProductOverview;
