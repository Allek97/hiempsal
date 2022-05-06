import { FC } from "react";

import { Root } from "./ProductDescription.styled";

export interface Props {
    description: string;
    featureName: string;
}

const ProductDescription: FC<Props> = ({ description, featureName }) => {
    return (
        <Root>
            <h2>Product description</h2>
            <h1>{featureName}</h1>
            <p>{description}</p>
        </Root>
    );
};

export default ProductDescription;
