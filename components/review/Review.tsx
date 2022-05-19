import { FC } from "react";
import { Container } from "@components/product/ProductInformation/commun";
import RatingStyle from "@components/elements/RatingStyle";

import {
    Header,
    ReviewContainer,
    ReviewOverview,
    UtilBtn,
} from "./Review.styled";
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
            <ReviewContainer>
                <ReviewOverview>
                    <span className="mr-3">4.7</span>
                    <div className="flex flex-col self-center mt-2.5">
                        <RatingStyle size="large" value={4.3} />
                        <span className="text-xs tracking-normal text-accents-6 mt-2">
                            5 Reviews
                        </span>
                    </div>
                </ReviewOverview>
            </ReviewContainer>
        </Container>
    );
};

export default Review;
