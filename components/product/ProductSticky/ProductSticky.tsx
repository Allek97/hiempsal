import { PopupContainer } from "@components/ui";
import { FC } from "react";

import { Root } from "./ProductSticky.styled";

const ProductSticky: FC = () => {
    return (
        <PopupContainer>
            <Root>
                <button type="button">
                    <div>"IMAGE"</div>
                    <div>NAME + PRICE</div>
                </button>
                <div>
                    <div>
                        <h1>Select Size</h1>
                    </div>
                </div>
            </Root>
        </PopupContainer>
    );
};

export default ProductSticky;
