import { Ripple } from "@components/ui";
import { FC, MouseEventHandler } from "react";

import {
    HiOutlineArrowNarrowLeft,
    HiOutlineArrowNarrowRight,
} from "react-icons/hi";

import { Control, ControlBtn } from "./ProductSliderControl.styled";

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
            <Control direction="left">
                <Ripple>
                    <ControlBtn
                        onClick={onPrev}
                        aria-label="Previous Product Image"
                        isExtremity={currentSlide === 0}
                    >
                        <HiOutlineArrowNarrowLeft />
                    </ControlBtn>
                </Ripple>
            </Control>

            <Control direction="right">
                <Ripple>
                    <ControlBtn
                        onClick={onNext}
                        aria-label="Previous Product Image"
                        isExtremity={currentSlide === totalSlides - 1}
                    >
                        <HiOutlineArrowNarrowRight />
                    </ControlBtn>
                </Ripple>
            </Control>
        </>
    );
};

export default ProductSliderControl;
