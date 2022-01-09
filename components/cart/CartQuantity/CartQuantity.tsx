import { FC } from "react";
import { Root } from "./CartQuantity.styled";

const CartQuantity: FC = () => {
    return (
        <Root>
            <span>-</span>
            <span>2</span>
            <span>+</span>
        </Root>
    );
};

export default CartQuantity;
