import { FC } from "react";
import { Root } from "./CartQuantity.styled";

interface Props {
    quantity: number;
}

const CartQuantity: FC<Props> = ({ quantity }) => {
    return (
        <Root>
            <span>-</span>
            <span>{quantity ?? 0}</span>
            <span>+</span>
        </Root>
    );
};

export default CartQuantity;
