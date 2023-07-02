/* eslint-disable react/require-default-props */
import { ProductImage } from "@framework/types/product";
import Image from "next/image";
import { placeholderBlurUrl } from "@lib/placeholderBlurUrl";

import { Dispatch, FC, SetStateAction } from "react";
import {
    VariantVisualizerBox,
    VariantVisualizers,
} from "./ImageVisualizer.styled";

interface Props {
    variantImages: (ProductImage | undefined)[];
    thumbnail: ProductImage;
    selectedImage: ProductImage;
    setSelectedImage: Dispatch<SetStateAction<ProductImage>>;
    variant?: "product" | "userlist";
}
const placeHolder = "/product-image-placeholder.svg";

const ImageVisualizer: FC<Props> = ({
    variantImages,
    thumbnail,
    selectedImage,
    setSelectedImage,
    variant = "product",
}) => {
    return (
        <VariantVisualizerBox>
            {[thumbnail, ...variantImages].map((variantImage, idx) => (
                <VariantVisualizers
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${variantImage?.url ?? idx},${idx}`}
                    type="button"
                    onMouseOver={() => {
                        setSelectedImage(variantImage ?? thumbnail);
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
                        variantImage?.url === thumbnail.url
                            ? {
                                  backgroundColor: "rgb(217, 217, 217)",
                              }
                            : {}
                    }
                    $variant={variant}
                >
                    <Image
                        placeholder="blur"
                        blurDataURL={placeholderBlurUrl}
                        src={variantImage?.url ?? placeHolder}
                        alt={variantImage?.alt ?? "product"}
                        layout="fill"
                        objectFit="contain"
                        priority
                        quality={60}
                    />
                </VariantVisualizers>
            ))}
        </VariantVisualizerBox>
    );
};

export default ImageVisualizer;
