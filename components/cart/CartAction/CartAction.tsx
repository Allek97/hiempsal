import { FC } from "react";
import { Root } from "./CartAction.styled";

const CartAction: FC = () => {
    return (
        <Root>
            <span>-</span>
            <span>2</span>
            <span>+</span>
        </Root>
    );
};

export default CartAction;
