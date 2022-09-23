import { FC, useEffect, useRef } from "react";
import { GoPencil } from "react-icons/go";
import { IoMdChatbubbles } from "react-icons/io";

import useReview from "@framework/review/use-review";
import useQuestion from "@framework/question/use-question";
import { Container } from "@components/product/ProductInformation/commun";
import RatingStyle from "@components/elements/RatingStyle";

import { Customer } from "./Customer";
import { FunctionalBtn } from "./Commun/FunctionalBtn.styled";

import { BtnContainer, Header, UtilBtn, ReviewOverview } from "./Review.styled";
import { useReviewContext } from "./context";
import { ReviewForm } from "./ReviewForm";
import { QuestionForm } from "./QuestionForm";

interface Props {
    productId: string;
    productType: "clothing" | "technology";
}

// NOTE This component will sit beside <ProductInformation /> component
// NOTE This component will also be reused in order page to write review about the product
const Review: FC<Props> = ({ productId, productType }) => {
    const {
        isReviewOpen,
        isReviewUIOpen,
        isQuestionUIOpen,
        isReviewSubmitted,
        isQuestionSubmitted,
        openReview,
        openQuestionUI,
        openReviewUI,
        closeReview,
    } = useReviewContext();
    const ref = useRef<HTMLDivElement>(null);

    // NOTE Get the reviews
    const getReview = useReview();
    const { data: reviews } = getReview({ productId: productId });

    // NOTE Get the questions
    const getQuestion = useQuestion();
    const { data: questions } = getQuestion({ productId: productId });

    useEffect(() => {
        if (ref.current) {
            if (
                isReviewSubmitted ||
                isQuestionSubmitted ||
                isReviewUIOpen ||
                isQuestionUIOpen
            ) {
                ref.current.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            }
        }
    }, [
        isReviewSubmitted,
        isQuestionSubmitted,
        isReviewUIOpen,
        isQuestionUIOpen,
    ]);

    return (
        <Container ref={ref}>
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
                        {`${reviews?.length ?? 0} Reviews`}
                        {`${
                            (questions?.length ?? 0) > 0
                                ? `, ${questions?.length} Q&As`
                                : ``
                        }`}
                    </span>
                </div>
            </ReviewOverview>

            <div>
                {isReviewOpen ? (
                    <div>
                        <ReviewForm
                            key="review-form"
                            productId={productId}
                            productType={productType}
                        />
                        <Customer
                            key="review"
                            data={reviews ?? []}
                            type="review"
                        />
                    </div>
                ) : (
                    <div>
                        <QuestionForm
                            key="question-form"
                            productId={productId}
                        />
                        <Customer
                            key="question"
                            data={questions ?? []}
                            type="question"
                        />
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
