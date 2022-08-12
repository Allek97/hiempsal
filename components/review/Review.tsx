import { FC } from "react";
import { GoPencil } from "react-icons/go";
import { IoMdChatbubbles } from "react-icons/io";

import { useProduct } from "@components/product/context";
import useReview from "@framework/review/use-review";
import { Container } from "@components/product/ProductInformation/commun";
import RatingStyle from "@components/elements/RatingStyle";

import { Customer } from "./Customer";
import { FunctionalBtn } from "./Commun/FunctionalBtn.styled";

import { BtnContainer, Header, UtilBtn, ReviewOverview } from "./Review.styled";
import { useReviewContext } from "./context";
import { ReviewForm } from "./ReviewForm";

// NOTE This component will sit beside <ProductInformation /> component
const Review: FC = () => {
    const {
        isReviewOpen,

        openReview,
        openQuestionUI,
        openReviewUI,
        closeReview,
    } = useReviewContext();

    const { productId } = useProduct();
    const getReview = useReview();
    const { data: reviews } = getReview({ productId: productId });

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
                <h3 className="mr-3">
                    {reviews?.length
                        ? reviews[0].ratingsAverage.toFixed(1)
                        : ""}
                </h3>

                <div className="flex flex-col self-center mt-2.5">
                    <RatingStyle
                        customSize="large"
                        value={reviews?.length ? reviews[0].ratingsAverage : 0}
                    />
                    <span className="text-xs tracking-normal text-accents-6 mt-2">
                        {`${reviews?.length ?? 0} Reviews`}, 3 Q&As
                    </span>
                </div>
            </ReviewOverview>

            <div>
                {isReviewOpen ? (
                    <div>
                        <ReviewForm />
                        <Customer data={reviews!} type="review" />
                    </div>
                ) : (
                    <div>
                        <ReviewForm />
                        <Customer data={reviews!} type="question" />
                    </div>
                )}
            </div>

            <BtnContainer>
                <FunctionalBtn
                    className="mr-3.5"
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
                    onClick={() => {
                        closeReview();
                        openQuestionUI();
                    }}
                >
                    <IoMdChatbubbles />
                    Ask A Question
                </FunctionalBtn>
            </BtnContainer>
        </Container>
    );
};

export default Review;
