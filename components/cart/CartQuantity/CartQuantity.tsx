import { FC } from "react";
import { Root, UtilityBtn } from "./CartQuantity.styled";

interface Props {
    quantity: number;
}

const CartQuantity: FC<Props> = ({ quantity }) => {
    return (
        <Root>
            <UtilityBtn isDisabled={quantity === 1} type="button">
                -
            </UtilityBtn>
            <span>{quantity ?? 0}</span>
            <UtilityBtn type="button">+</UtilityBtn>
        </Root>
    );
};

export default CartQuantity;
