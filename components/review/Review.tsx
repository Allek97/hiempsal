import { FC, useState } from "react";
import { GoPencil } from "react-icons/go";
import { IoMdChatbubbles } from "react-icons/io";

import { Container } from "@components/product/ProductInformation/commun";
import RatingStyle from "@components/elements/RatingStyle";

import { ReviewCustomer as CustomerReviews } from "./ReviewCustomer";
import { FunctionalBtn } from "./Commun/FunctionalBtn.styled";

import { BtnContainer, Header, UtilBtn, ReviewOverview } from "./Review.styled";
import { useReview } from "./context";
import { ReviewForm } from "./ReviewForm";
import Confirmation from "./Commun/Confirmation";

// NOTE This component will sit beside <ProductInformation /> component
const Review: FC = () => {
    const { isReviewOpen, isReviewSubmitted, openReview, closeReview } =
        useReview();

    const [isOpen, setIsOpen] = useState<boolean>(false);

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

            {!isReviewSubmitted ? (
                <Confirmation />
            ) : (
                <ReviewForm isOpen={isOpen} />
            )}

            <CustomerReviews />

            <BtnContainer>
                <FunctionalBtn
                    isHoverActive={false}
                    $isSelected={isReviewOpen}
                    onClick={() => {
                        setIsOpen(true);
                        openReview();
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
