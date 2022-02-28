import { FC, useState } from "react";
import Image from "next/image";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { CgArrowsExpandRight } from "react-icons/cg";
import { AiOutlineAlignCenter } from "react-icons/ai";

import { Product } from "@framework/types/product";

import { ProductSlider } from "..";

import {
    ImageContainer,
    ImageControlView,
    ImageControlZoom,
    Root,
    SliderContainer,
} from "./ProductView.styled";

interface Props {
    product: Product;
}

const ProductView: FC<Props> = ({ product }) => {
    return (
        <Root>
            <SliderContainer>
                <ProductSlider>
                    {product.images.map((image, idx) => (
                        <ImageContainer key={image.url}>
                            <TransformWrapper
                                initialScale={1}
                                initialPositionX={0}
                                initialPositionY={0}
                                wheel={{ disabled: true }}
                            >
                                {({
                                    zoomIn,
                                    zoomOut,
                                    centerView,
                                    resetTransform,
                                }) => (
                                    <>
                                        <ImageControlView>
                                            <ImageControlZoom>
                                                <button
                                                    onClick={() => zoomIn()}
                                                    type="button"
                                                >
                                                    +
                                                </button>
                                                <button
                                                    onClick={() => zoomOut()}
                                                    type="button"
                                                >
                                                    -
                                                </button>
                                            </ImageControlZoom>

                                            <button
                                                onClick={() => resetTransform()}
                                                type="button"
                                            >
                                                <CgArrowsExpandRight />
                                            </button>
                                            <button
                                                onClick={() => centerView()}
                                                type="button"
                                            >
                                                <AiOutlineAlignCenter />
                                            </button>
                                        </ImageControlView>
                                        <TransformComponent
                                            wrapperStyle={{
                                                position: "relative",
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        >
                                            <Image
                                                src={image.url}
                                                alt={
                                                    image.alt ||
                                                    `${product.name} Image`
                                                }
                                                layout="fill"
                                                objectFit="contain"
                                                quality="85"
                                                priority={idx === 0}
                                            />
                                        </TransformComponent>
                                    </>
                                )}
                            </TransformWrapper>
                        </ImageContainer>
                    ))}
                </ProductSlider>
            </SliderContainer>
        </Root>
    );
};

export default ProductView;
