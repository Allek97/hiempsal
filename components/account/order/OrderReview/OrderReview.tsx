import { FC } from "react";
import { AnimatePresence } from "framer-motion";
import { Popup } from "@components/ui";
import { Review } from "@components/review";
import { useUI } from "@components/ui/context";
import { ProductOverview } from "@components/product/ProductOverview";
import { ProductImage, ProductPrice } from "@framework/types/product";

interface Props {
    productId: string;
    productImage: ProductImage;
    productName: string;
    productPrice: ProductPrice;
}

const OrderReview: FC<Props> = ({
    productId,
    productImage,
    productName,
    productPrice,
}) => {
    const { isReviewOpen } = useUI();
    return (
        <Popup data-testid="product-popup">
            <AnimatePresence>
                {isReviewOpen && (
                    <>
                        <Review productId={productId} />
                        <ProductOverview
                            productImage={productImage}
                            productName={productName}
                            productPrice={productPrice}
                            variant="review"
                        />
                    </>
                )}
            </AnimatePresence>
        </Popup>
    );
};

export default OrderReview;
