/* eslint-disable react/require-default-props */
import { getVariantImages } from "@components/common/helpers";
import { Product, ProductImage } from "@framework/types/product";
import Image from "next/image";
import { Dispatch, FC, SetStateAction, useMemo } from "react";
import {
    VariantVisualizerBox,
    VariantVisualizers,
} from "./ImageVisualizer.styled";

interface Props {
    product: Product;
    selectedImage: ProductImage;
    setSelectedImage: Dispatch<SetStateAction<ProductImage>>;
    variant?: "product" | "userlist";
}

const ImageVisualizer: FC<Props> = ({
    product,
    selectedImage,
    setSelectedImage,
    variant = "product",
}) => {
    const { images } = product;
    const placeHolder = "/product-image-placeholder.svg";

    const variantImages = useMemo(
        () => [images[0], ...getVariantImages(product)],
        [product, images]
    );

    return (
        <VariantVisualizerBox>
            {variantImages.map((variantImage, idx) => (
                <VariantVisualizers
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${variantImage?.url ?? idx},${idx}`}
                    type="button"
                    onMouseOver={() => {
                        setSelectedImage(variantImage ?? images[0]);
                    }}
                    whileHover={{
                        border: "1px solid #cdcdcd",
                    }}
                    animate={
                        selectedImage?.url === variantImage?.url
                            ? {
                                  border: "1px solid #676767",
                              }
                            : {
                                  border: "1px solid transparent",
                              }
                    }
                    style={
                        variantImage?.url === images[0].url
                            ? {
                                  backgroundColor: "rgb(217, 217, 217)",
                              }
                            : {}
                    }
                    $variant={variant}
                >
                    <Image
                        placeholder="blur"
                        src={variantImage?.url ?? placeHolder}
                        alt={variantImage?.alt ?? "product"}
                        layout="fill"
                        objectFit="contain"
                        priority
                    />
                </VariantVisualizers>
            ))}
        </VariantVisualizerBox>
    );
};

export default ImageVisualizer;
