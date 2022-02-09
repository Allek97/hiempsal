/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
import { FC, useState } from "react";
// import "./styless.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

import {
    ArrowSvgLeft,
    ArrowSvgRight,
    ImageContainer,
    Wrapper,
} from "./ImageSlider.styled";

interface Props {
    direction: "left" | "right";
    disabled: boolean;
    onClick: (e: any) => void;
}

function Arrow(props: Props) {
    const { disabled, direction } = props;
    return (
        <div>
            {direction === "left" ? (
                <ArrowSvgLeft onClick={props.onClick} disabled={disabled} />
            ) : (
                <ArrowSvgRight onClick={props.onClick} disabled={disabled} />
            )}
        </div>
    );
}

const ImageSlider: FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
    });

    return (
        <Wrapper>
            <div ref={sliderRef} className="keen-slider h-full w-full">
                <ImageContainer className="keen-slider__slide">
                    <Image
                        src="/images/macbook-pro.png"
                        alt="Black hoodie"
                        quality="100"
                        layout="fill"
                        objectFit="contain"
                    />
                </ImageContainer>
                <ImageContainer className="keen-slider__slide">
                    <Image
                        src="/images/macbook-pro-2.png"
                        alt="Black hoodie"
                        quality="100"
                        layout="fill"
                        objectFit="contain"
                    />
                </ImageContainer>
                <ImageContainer className="keen-slider__slide">
                    <Image
                        src="/images/macbook-pro-3.png"
                        alt="Black hoodie"
                        quality="100"
                        layout="fill"
                        objectFit="contain"
                    />
                </ImageContainer>
                <ImageContainer className="keen-slider__slide">
                    <Image
                        src="/images/macbook-pro-4.png"
                        alt="Black hoodie"
                        quality="100"
                        layout="fill"
                        objectFit="contain"
                    />
                </ImageContainer>
                <ImageContainer className="keen-slider__slide">
                    <Image
                        src="/images/macbook-pro-5.png"
                        alt="Black hoodie"
                        quality="100"
                        layout="fill"
                        objectFit="contain"
                    />
                </ImageContainer>
                <ImageContainer className="keen-slider__slide">
                    <Image
                        src="/images/macbook-pro.png"
                        alt="Black hoodie"
                        quality="100"
                        layout="fill"
                        objectFit="contain"
                    />
                </ImageContainer>
            </div>
            {loaded && instanceRef.current && (
                <>
                    <Arrow
                        direction="left"
                        onClick={(e: any) =>
                            e.stopPropagation() || instanceRef.current?.prev()
                        }
                        disabled={currentSlide === 0}
                    />

                    <Arrow
                        direction="right"
                        onClick={(e: any) =>
                            e.stopPropagation() || instanceRef.current?.next()
                        }
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
