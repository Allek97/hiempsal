import { FC } from "react";
import { AnimatePresence } from "framer-motion";
import { Popup } from "@components/ui";
import { Review } from "@components/review";
import { useUI } from "@components/ui/context";

interface Props {
    productId: string;
}

const OrderReview: FC<Props> = ({ productId }) => {
    const { isReviewOpen } = useUI();
    return (
        <Popup data-testid="product-popup">
            <AnimatePresence>
                {isReviewOpen && <Review productId={productId} />}
            </AnimatePresence>
        </Popup>
    );
};

export default OrderReview;
