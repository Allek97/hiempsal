import { FC } from "react";
import { motion, Variants } from "framer-motion";

import { useUI } from "@components/ui/context";
import RatingStyle from "@components/elements/RatingStyle";
import { ReviewBtn, Root } from "./ProductDescription.styled";

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
    const { openReview } = useUI();

    return (
        <Root>
            <h2>Product description</h2>
            <h1>{featureName}</h1>
            <p>{description}</p>
            <ReviewBtn type="button" whileHover="hover" onClick={openReview}>
                <RatingStyle value={4.7} />
                <motion.span
                    className="text-accents-8 tracking-tighter"
                    variants={reviewMotion}
                    style={{ transformOrigin: "center bottom" }}
                >
                    29 Reviews
                </motion.span>
            </ReviewBtn>
        </Root>
    );
};

export default ProductDescription;
