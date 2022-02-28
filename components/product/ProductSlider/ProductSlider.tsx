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
import { ProductSliderControl } from "..";
import { Root, Slider } from "./ProductSlider.styled";

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

            // We set a threshold (10px) on both sizes of the screen,
            // if the touch area overlaps with the screen edges
            // it's likely to trigger the navigation. We prevent the
            // touchstart event in that case.
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

    return (
        <Root ref={sliderContainerRef}>
            <Slider ref={ref} className="keen-slider" isMounted={isMounted}>
                {slider && (
                    <ProductSliderControl onPrev={onPrev} onNext={onNext} />
                )}
                {Children.map(children, (child) => {
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
                            },
                        };
                    }
                    return child;
                })}
            </Slider>
        </Root>
    );
};

export default ProductSlider;
