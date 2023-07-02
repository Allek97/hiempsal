import { FC } from "react";

import useUpdateItem from "@framework/cart/use-update-item";
import { LineItem } from "@framework/types/cart";

import { Root, UtilityBtn } from "./CartQuantity.styled";

interface Props {
    cartItem: LineItem;
}

const CartQuantity: FC<Props> = ({ cartItem }) => {
    const { id: lineItemId, variantId, quantity } = cartItem;

    const updateItem = useUpdateItem();

    const updateQuantity = async (
        action: "INCREMENT" | "DECREMENT",
        step = 1
    ) => {
        await updateItem({
            lineItemId,
            quantity:
                action === "INCREMENT" ? quantity + step : quantity - step,
            variantId,
        });
    };

    return (
        <Root>
            <UtilityBtn
                isDisabled={quantity === 1}
                type="button"
                onClick={() => updateQuantity("DECREMENT")}
            >
                -
            </UtilityBtn>
            <span>{quantity ?? 0}</span>
            <UtilityBtn
                type="button"
                onClick={() => updateQuantity("INCREMENT")}
            >
                +
            </UtilityBtn>
        </Root>
    );
};

export default CartQuantity;
