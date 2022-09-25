import { FC } from "react";
import { AnimatePresence } from "framer-motion";
import { Popup } from "@components/ui";
import { Review, ReviewProvider } from "@components/review";
import { useUI } from "@components/ui/context";
import { ProductOverview } from "@components/product/ProductOverview";
import { ProductImage, ProductPrice } from "@framework/types/product";

interface Props {
    productId: string;
    productType: "clothing" | "technology";
    productImage: ProductImage;
    productName: string;
    productPrice: ProductPrice;
}

const OrderReview: FC<Props> = ({
    productId,
    productImage,
    productName,
    productPrice,
    productType,
}) => {
    const { isReviewOpen } = useUI();
    return (
        <div>
            <ReviewProvider>
                {isReviewOpen && (
                    <Popup data-testid="product-popup">
                        <AnimatePresence>
                            <Review
                                key={productName}
                                productId={productId}
                                productType={productType}
                            />
                            <ProductOverview
                                productImage={productImage}
                                productName={productName}
                                productPrice={productPrice}
                                variant="review"
                            />
                        </AnimatePresence>
                    </Popup>
                )}
            </ReviewProvider>
        </div>
    );
};

export default OrderReview;
