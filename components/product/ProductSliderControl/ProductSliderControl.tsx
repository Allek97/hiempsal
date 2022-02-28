import { FC, MouseEventHandler } from "react";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { Control, ControlBtn } from "./ProductSliderControl.styled";

interface Props {
    onPrev: MouseEventHandler<HTMLButtonElement>;
    onNext: MouseEventHandler<HTMLButtonElement>;
}

const ProductSliderControl: FC<Props> = ({ onPrev, onNext }) => {
    return (
        <Control>
            <ControlBtn
                direction="left"
                onClick={onPrev}
                aria-label="Previous Product Image"
            >
                <FaArrowLeft />
            </ControlBtn>
            <ControlBtn
                direction="right"
                onClick={onNext}
                aria-label="Previous Product Image"
            >
                <FaArrowRight />
            </ControlBtn>
        </Control>
    );
};

export default ProductSliderControl;
