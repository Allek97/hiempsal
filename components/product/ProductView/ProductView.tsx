import { FC } from "react";
import Image from "next/image";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { Product } from "@framework/types/product";
import {
    ImageContainer,
    ImageControlView,
    ImageControlZoom,
    Root,
    SliderContainer,
} from "./ProductView.styled";
import { ProductSlider } from "..";

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
                                                x
                                            </button>
                                            <button
                                                onClick={() => centerView()}
                                                type="button"
                                            >
                                                center
                                            </button>
                                        </ImageControlView>
                                        <TransformComponent>
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
