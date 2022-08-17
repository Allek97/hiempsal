import { FC } from "react";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

import useReview from "@framework/review/use-review";

import { useUI } from "@components/ui/context";
import RatingStyle from "@components/elements/RatingStyle";
import { ReviewBtn, Root, WriteReviewBtn } from "./ProductDescription.styled";
import { useProduct } from "../context";

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
    const { productId } = useProduct();
    const getReviews = useReview();
    const { data: reviews } = getReviews({ productId });

    const { ref: contentRef, inView: isContentInView } = useInView({
        threshold: 0.25,
        triggerOnce: true,
    });

    return (
        <Root>
            <h2>Product description</h2>
            <motion.div
                ref={contentRef}
                initial={{ opacity: 0 }}
                animate={isContentInView && { opacity: 1 }}
                transition={{
                    delay: 0.1,
                    duration: 0.3,
                    ease: [0.7, 0.09, 0.71, 0.09],
                }}
            >
                <h1>{featureName}</h1>
                <p>{description}</p>
            </motion.div>
            {reviews?.length ? (
                <ReviewBtn
                    type="button"
                    whileHover="hover"
                    onClick={openReview}
                >
                    <RatingStyle value={reviews[0].ratingsAverage} />
                    <motion.span
                        className="text-accents-8 tracking-tighter"
                        style={{ transformOrigin: "center bottom" }}
                        variants={reviewMotion}
                    >
                        {`${reviews?.length ?? 0} ${
                            (reviews?.length ?? 0) <= 1 ? `Review` : `Reviews`
                        }`}
                    </motion.span>
                </ReviewBtn>
            ) : (
                <WriteReviewBtn
                    type="button"
                    whileHover="hover"
                    onClick={openReview}
                >
                    <motion.span
                        style={{ transformOrigin: "center bottom" }}
                        variants={reviewMotion}
                    >
                        Write a review
                    </motion.span>
                </WriteReviewBtn>
            )}
        </Root>
    );
};

export default ProductDescription;
