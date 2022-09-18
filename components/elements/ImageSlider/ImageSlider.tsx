/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
import { FC, useState } from "react";
// import "./styless.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { ProductImage } from "@framework/types/product";

import {
    ArrowSvgLeft,
    ArrowSvgRight,
    ImageContainer,
    Indicator,
    IndicatorSlide,
    Wrapper,
} from "./ImageSlider.styled";

interface ArrowProps {
    direction: "left" | "right";
    disabled: boolean;
    onClick: (e: any) => void;
}

type Direction = "left" | "right" | "center";

const Arrow = (props: ArrowProps): JSX.Element => {
    const { disabled, direction, onClick } = props;
    return (
        <div>
            {direction === "left" ? (
                <ArrowSvgLeft onClick={onClick} disabled={disabled} />
            ) : (
                <ArrowSvgRight onClick={onClick} disabled={disabled} />
            )}
        </div>
    );
};

interface Props {
    images: ProductImage[];
}

const placeHolder = "./product-image-placeholder.svg";

const ImageSlider: FC<Props> = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [direction, setDirection] = useState<Direction>("left");
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
        dragged() {
            setDirection("center");
        },
    });

    const totalNbImages = instanceRef.current?.track.details.slides.length;

    // console.log(instanceRef.current?.track.details.slides);

    return (
        <Wrapper>
            <Indicator>
                {Array.from(Array(totalNbImages ?? 0).keys()).map((el) => (
                    <IndicatorSlide
                        direction={direction}
                        key={el}
                        isActive={currentSlide === el}
                    />
                ))}
            </Indicator>
            <div ref={sliderRef} className="keen-slider h-full w-full">
                {images.map((image, idx) => (
                    <ImageContainer
                        key={`${image.url},${idx}`}
                        className="keen-slider__slide"
                    >
                        <Image
                            src={image.url ?? placeHolder}
                            alt={image.alt ?? "product"}
                            quality="90"
                            layout="fill"
                            objectFit="contain"
                            priority
                        />
                    </ImageContainer>
                ))}
            </div>
            {loaded && instanceRef.current && (
                <>
                    <Arrow
                        direction="left"
                        onClick={(e: any) => {
                            setDirection("left");
                            e.stopPropagation();
                            instanceRef.current?.prev();
                        }}
                        disabled={currentSlide === 0}
                    />

                    <Arrow
                        direction="right"
                        onClick={(e: any) => {
                            setDirection("right");
                            e.stopPropagation();
                            instanceRef.current?.next();
                        }}
                        disabled={
                            currentSlide ===
                            instanceRef.current.track.details.slides.length - 1
                        }
                    />
                </>
            )}
        </Wrapper>
    );
};

export default ImageSlider;
