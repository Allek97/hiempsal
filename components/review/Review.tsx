import { FC } from "react";
import { GoPencil } from "react-icons/go";
import { IoMdChatbubbles } from "react-icons/io";

import { useProduct } from "@components/product/context";
import useReview from "@framework/review/use-review";
import { Container } from "@components/product/ProductInformation/commun";
import RatingStyle from "@components/elements/RatingStyle";

import { CustomerReviews } from "./CustomerReviews";
import { FunctionalBtn } from "./Commun/FunctionalBtn.styled";

import { BtnContainer, Header, UtilBtn, ReviewOverview } from "./Review.styled";
import { useReviewContext } from "./context";
import { ReviewForm } from "./ReviewForm";
import Confirmation from "./Commun/Confirmation";

// NOTE This component will sit beside <ProductInformation /> component
const Review: FC = () => {
    const {
        isReviewOpen,
        isReviewSubmitted,
        openReview,
        openReviewUI,
        closeReview,
    } = useReviewContext();

    const { productId } = useProduct();
    const getReview = useReview();
    const { data: reviews, isEmpty } = getReview({ productId: productId });

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
            <ReviewOverview>
                <span className="mr-3">4.7</span>
                <div className="flex flex-col self-center mt-2.5">
                    <RatingStyle customSize="large" value={4.3} />
                    <span className="text-xs tracking-normal text-accents-6 mt-2">
                        5 Reviews
                    </span>
                </div>
            </ReviewOverview>

            {isReviewSubmitted ? <Confirmation isReview /> : <ReviewForm />}

            {reviews ? (
                <CustomerReviews reviews={reviews} isEmpty={isEmpty} />
            ) : (
                <div>These was a problem in the server please reload !</div>
            )}

            <BtnContainer>
                <FunctionalBtn
                    isHoverActive={false}
                    $isSelected={isReviewOpen}
                    onClick={() => {
                        openReviewUI();
                    }}
                >
                    <GoPencil />
                    Write A Review
                </FunctionalBtn>
                <FunctionalBtn
                    isHoverActive={false}
                    $isSelected={!isReviewOpen}
                    onClick={closeReview}
                >
                    <IoMdChatbubbles />
                    Ask A Question
                </FunctionalBtn>
            </BtnContainer>
        </Container>
    );
};

export default Review;
