import { FC } from "react";
import { Root } from "./ProductOverview.styled";

const ProductOverview: FC = () => {
    return (
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
    );
};

export default ProductOverview;
