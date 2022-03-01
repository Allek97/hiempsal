/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
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

import {
    ImageControlView,
    ImageControlZoom,
    Root,
    Slider,
} from "./ProductSlider.styled";

const ProductSlider: FC = ({ children }) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const sliderContainerRef = useRef<HTMLDivElement>(null);

    const [ref, slider] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: { perView: 1 },
        created: () => setIsMounted(true),
        slideChanged(s) {
            const slideNumber = s.track.details.rel;
            setCurrentSlide(slideNumber);
        },
    });

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

    const totalNbImages = slider.current?.track.details.slides.length;

    const onFirst = useCallback(() => slider.current?.moveToIdx(0), [slider]);

    return (
        <Root ref={sliderContainerRef}>
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
                                <button onClick={() => zoomIn()} type="button">
                                    <BiPlus />
                                </button>
                                <button onClick={() => zoomOut()} type="button">
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
                        <Slider
                            ref={ref}
                            className="keen-slider"
                            isMounted={isMounted}
                        >
                            {slider && (
                                <ProductSliderControl
                                    onPrev={onPrev}
                                    onNext={onNext}
                                />
                            )}
                            <TransformComponent
                                wrapperStyle={{
                                    position: "relative",
                                    width: "100%",
                                    height: "100%",
                                }}
                                contentStyle={{ height: "100%" }}
                            >
                                <div className="relative flex flex-row h-full w-full">
                                    {Children.map(children, (child, idx) => {
                                        // Add the keen-slider__slide className to children

                                        if (isValidElement(child)) {
                                            return {
                                                ...child,
                                                props: {
                                                    ...child.props,
                                                    className: `${
                                                        child.props.className
                                                            ? `${child.props.className} `
                                                            : ""
                                                    }keen-slider__slide`,
                                                    id: `thumb-${idx}`,
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
        </Root>
    );
};

export default ProductSlider;
