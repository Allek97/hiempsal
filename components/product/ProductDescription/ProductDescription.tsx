import { FC } from "react";
import { motion, Variants } from "framer-motion";
import CircleIcon from "@mui/icons-material/Circle";

import {
    ReviewContainer,
    Root,
    StyledRating,
} from "./ProductDescription.styled";

export interface Props {
    description: string;
    featureName: string;
}

const reviewMotion: Variants = {
    hover: {
        skewX: "-10deg",
        transition: {
            duration: 0.3,
            ease: [0.19, 1, 0.22, 1],
        },
    },
};

const ProductDescription: FC<Props> = ({ description, featureName }) => {
    return (
        <Root>
            <h2>Product description</h2>
            <h1>{featureName}</h1>
            <p>{description}</p>
            <ReviewContainer whileHover="hover">
                <StyledRating
                    name="customized-color"
                    defaultValue={3.5}
                    precision={0.5}
                    icon={<CircleIcon />}
                    emptyIcon={<CircleIcon />}
                    readOnly
                    size="small"
                />
                <motion.span
                    className="text-accents-8"
                    variants={reviewMotion}
                    style={{ transformOrigin: "center bottom" }}
                    // whileHover={{skew}}
                >
                    4 Reviews
                </motion.span>
            </ReviewContainer>
        </Root>
    );
};

export default ProductDescription;
