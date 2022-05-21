import { FC } from "react";
import { Container } from "@components/product/ProductInformation/commun";

import { ReviewCustomer } from "./ReviewCustomer";

import { BtnContainer, Header, UtilBtn, FunctionalBtn } from "./Review.styled";
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
            <BtnContainer>
                <FunctionalBtn
                    isHoverActive={false}
                    $isSelected={isReviewOpen}
                    onClick={openReview}
                >
                    Write A Review
                </FunctionalBtn>
                <FunctionalBtn
                    isHoverActive={false}
                    $isSelected={!isReviewOpen}
                    onClick={closeReview}
                >
                    Ask A Question
                </FunctionalBtn>
            </BtnContainer>
        </Container>
    );
};

export default Review;
