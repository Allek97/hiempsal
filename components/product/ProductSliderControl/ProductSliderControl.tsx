import { FC, MouseEventHandler } from "react";

import {
    HiOutlineArrowNarrowLeft,
    HiOutlineArrowNarrowRight,
} from "react-icons/hi";

import { ControlBtn, Ripple } from "./ProductSliderControl.styled";

interface Props {
    onPrev: MouseEventHandler<HTMLButtonElement>;
    onNext: MouseEventHandler<HTMLButtonElement>;
    totalSlides: number;
    currentSlide: number;
}

const ProductSliderControl: FC<Props> = ({
    onPrev,
    onNext,
    totalSlides,
    currentSlide,
}) => {
    return (
        <>
            <Ripple direction="left">
                <ControlBtn
                    onClick={onPrev}
                    aria-label="Previous Product Image"
                    isExtremity={currentSlide === 0}
                >
                    <HiOutlineArrowNarrowLeft />
                </ControlBtn>
            </Ripple>

            <Ripple direction="right">
                <ControlBtn
                    onClick={onNext}
                    aria-label="Previous Product Image"
                    isExtremity={currentSlide === totalSlides - 1}
                >
                    <HiOutlineArrowNarrowRight />
                </ControlBtn>
            </Ripple>
        </>
    );
};

export default ProductSliderControl;
