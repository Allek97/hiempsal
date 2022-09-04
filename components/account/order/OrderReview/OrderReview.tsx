import { FC } from "react";
import { AnimatePresence } from "framer-motion";
import { Popup } from "@components/ui";
import { Review } from "@components/review";
import { useUI } from "@components/ui/context";

const OrderReview: FC = () => {
    const { isReviewOpen } = useUI();
    return (
        <Popup data-testid="product-popup">
            <AnimatePresence>
                {isReviewOpen && (
                    <Review productId="gid://shopify/Product/7096221368509" />
                )}
            </AnimatePresence>
        </Popup>
    );
};

export default OrderReview;
