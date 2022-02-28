import { FC, MouseEventHandler } from "react";

import {
    HiOutlineArrowNarrowLeft,
    HiOutlineArrowNarrowRight,
} from "react-icons/hi";

import { ControlBtn } from "./ProductSliderControl.styled";

interface Props {
    onPrev: MouseEventHandler<HTMLButtonElement>;
    onNext: MouseEventHandler<HTMLButtonElement>;
}

const ProductSliderControl: FC<Props> = ({ onPrev, onNext }) => {
    return (
        <>
            <ControlBtn
                direction="left"
                onClick={onPrev}
                aria-label="Previous Product Image"
            >
                <HiOutlineArrowNarrowLeft />
            </ControlBtn>
            <ControlBtn
                direction="right"
                onClick={onNext}
                aria-label="Previous Product Image"
            >
                <HiOutlineArrowNarrowRight />
            </ControlBtn>
        </>
    );
};

export default ProductSliderControl;
