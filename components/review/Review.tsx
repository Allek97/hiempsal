import { FC } from "react";
import { Container } from "@components/product/ProductInformation/commun";

import { ReviewCustomer } from ".";

import { Header, UtilBtn } from "./Review.styled";
import { useReview } from "./context";

// NOTE This component will sit beside <ProductInformation /> component
const Review: FC = () => {
    const { isReviewOpen, openReview, closeReview } = useReview();

    return (
        <Container>
            <Header>
                <UtilBtn
                    type="button"
                    $isSelected={isReviewOpen}
                    onClick={openReview}
                >
                    Reviews
                </UtilBtn>
                <UtilBtn
                    type="button"
                    $isSelected={!isReviewOpen}
                    onClick={closeReview}
                >
                    Questions
                </UtilBtn>
            </Header>
            <ReviewCustomer />
        </Container>
    );
};

export default Review;
