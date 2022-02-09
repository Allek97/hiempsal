/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
import { FC, useState } from "react";
// import "./styless.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

import { ArrowSvg, ImageContainer, Wrapper } from "./ImageSlider.styled";

interface Props {
    direction: "left" | "right";
    disabled: boolean;
    onClick: (e: any) => void;
}

function Arrow(props: Props) {
    const { disabled, direction } = props;
    return (
        <ArrowSvg
            onClick={props.onClick}
            direction={direction}
            disabled={disabled}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {direction === "left" && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
            {direction === "right" && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </ArrowSvg>
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
                        src="/images/Women-TShirt-Peach-Front.png"
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
                        src="/images/macbook-pro.png"
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
