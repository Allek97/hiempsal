import { FC } from "react";
import { AnimatePresence } from "framer-motion";
import { Popup } from "@components/ui";
import { Review } from "@components/review";
import { useReviewContext } from "@components/review/context";

const OrderReview: FC = () => {
    const { isReviewOpen } = useReviewContext();
    return (
        <Popup data-testid="product-popup">
            <AnimatePresence>{isReviewOpen && <Review />}</AnimatePresence>
        </Popup>
    );
};

export default OrderReview;
