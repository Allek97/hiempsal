import { useKeenSlider } from "keen-slider/react";
import {
    Children,
    FC,
    isValidElement,
    useCallback,
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
