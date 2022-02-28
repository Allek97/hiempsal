import { FC, MouseEventHandler } from "react";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { ControlBtn, Root } from "./ProductSliderControl.styled";

interface Props {
    onPrev: MouseEventHandler<HTMLButtonElement>;
    onNext: MouseEventHandler<HTMLButtonElement>;
}

const ProductSliderControl: FC<Props> = ({ onPrev, onNext }) => {
    return (
        <Root>
            <ControlBtn
                direction="left"
                onClick={onPrev}
                aria-label="Previous Product Image"
            >
                <HiOutlineArrowLeft />
            </ControlBtn>
            <ControlBtn
                direction="left"
                onClick={onNext}
                aria-label="Previous Product Image"
            >
                <HiOutlineArrowRight />
            </ControlBtn>
        </Root>
    );
};

export default ProductSliderControl;
