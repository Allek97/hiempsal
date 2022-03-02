/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useMediaQueryNext } from "@lib/customHooks";
import { useKeenSlider } from "keen-slider/react";
import {
    Children,
    FC,
    isValidElement,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { BiMinus, BiPlus, BiReset } from "react-icons/bi";
import { CgArrowsExpandRight } from "react-icons/cg";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { ProductSliderControl } from "..";
import ThumbnailPlugin from "../ThumbnailPlugin";

import {
    Album,
    ImageControlView,
    ImageControlZoom,
    Root,
    Slider,
    Thumb,
} from "./ProductSlider.styled";

const ProductSlider: FC = ({ children }) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const sliderContainerRef = useRef<HTMLDivElement>(null);

    const isScreenLg = useMediaQueryNext("lg");

    const [ref, slider] = useKeenSlider<HTMLDivElement>({
        slides: { perView: 1 },
        created: () => setIsMounted(true),
        slideChanged(e) {
            const slideNumber = e.track.details.rel;
            setCurrentSlide(slideNumber);
        },
    });

    const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            slides: {
                perView: isScreenLg ? 4 : 3,
            },
        },
        [ThumbnailPlugin(slider)]
    );

    useEffect(() => {
        const preventNavigation = (event: TouchEvent) => {
            // Center point of the touch area
            const touchXPosition = event.touches[0].pageX;
            // Size of the touch area
            const touchXRadius = event.touches[0].radiusX || 0;

            if (
                touchXPosition - touchXRadius < 10 ||
                touchXPosition + touchXRadius > window.innerWidth - 10
            )
                event.preventDefault();
        };

        const mySlider = sliderContainerRef.current!;

        mySlider.addEventListener("touchstart", preventNavigation);

        return () => {
            if (mySlider) {
                mySlider.removeEventListener("touchstart", preventNavigation);
            }
        };
    }, []);

    const onPrev = useCallback(() => slider.current?.prev(), [slider]);
    const onNext = useCallback(() => slider.current?.next(), [slider]);

    const totalSlides = slider.current?.track.details.slides.length;

    const onFirst = useCallback(() => slider.current?.moveToIdx(0), [slider]);

    return (
        <Root ref={sliderContainerRef}>
            <div className="relative h-full w-full">
                <TransformWrapper
                    initialScale={1}
                    initialPositionX={0}
                    initialPositionY={0}
                    wheel={{ disabled: true }}
                    panning={{ disabled: true }}
                >
                    {({ zoomIn, zoomOut, resetTransform }) => (
                        <>
                            <ImageControlView>
                                <ImageControlZoom>
                                    <button
                                        onClick={() => zoomIn()}
                                        type="button"
                                    >
                                        <BiPlus />
                                    </button>
                                    <button
                                        onClick={() => zoomOut()}
                                        type="button"
                                    >
                                        <BiMinus />
                                    </button>
                                </ImageControlZoom>

                                <button
                                    onClick={() => resetTransform()}
                                    type="button"
                                >
                                    <CgArrowsExpandRight />
                                </button>
                                <button onClick={onFirst} type="button">
                                    <BiReset />
                                </button>
                            </ImageControlView>
                            {slider && (
                                <ProductSliderControl
                                    onPrev={onPrev}
                                    onNext={onNext}
                                    totalSlides={totalSlides ?? 0}
                                    currentSlide={currentSlide}
                                />
                            )}
                            <Slider
                                ref={ref}
                                className="keen-slider"
                                isMounted={isMounted}
                            >
                                <TransformComponent
                                    wrapperStyle={{
                                        position: "relative",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    contentStyle={{ height: "100%" }}
                                >
                                    <div className="relative flex flex-row h-full w-full">
                                        {Children.map(children, (child) => {
                                            // Add the keen-slider__slide className to children

                                            if (isValidElement(child)) {
                                                return {
                                                    ...child,
                                                    props: {
                                                        ...child.props,
                                                        className: `${
                                                            child.props
                                                                .className
                                                                ? `${child.props.className} `
                                                                : ""
                                                        }keen-slider__slide`,
                                                    },
                                                };
                                            }
                                            return child;
                                        })}
                                    </div>
                                </TransformComponent>
                            </Slider>
                        </>
                    )}
                </TransformWrapper>
            </div>

            <Album ref={thumbnailRef} className="keen-slider thumbnail">
                {slider &&
                    Children.map(children, (child, idx) => {
                        return (
                            <Thumb
                                isSelected={currentSlide === idx}
                                type="button"
                                className="keen-slider__slide"
                            >
                                {child}
                            </Thumb>
                        );
                    })}
                <div className="keen-slider__slide" />
                <div className="keen-slider__slide" />
            </Album>
        </Root>
    );
};

export default ProductSlider;
