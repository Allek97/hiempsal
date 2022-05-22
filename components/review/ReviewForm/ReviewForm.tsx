/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC, useState } from "react";

import RatingStyle from "@components/elements/RatingStyle";
import { motion, Variants } from "framer-motion";
import { useForm } from "react-hook-form";

import { Container, FormInput, FormTextArea } from "./ReviewForm.styled";
import { FunctionalBtn } from "../Commun/FunctionalBtn.styled";
import { ReviewFormType, useReview } from "../context";
import { ReviewFormChecks } from "./reviewFormChecks";

const containerMotion = (): Variants => ({
    hidden: { height: 0, opacity: 0 },
    visible: {
        height: "auto",
        opacity: 1,
        transition: {
            duration: 0.45,
            delay: 0.1,
        },
    },
    exit: {
        height: 0,
        transition: { duration: 0.35 },
    },
});

interface Props {
    isOpen: boolean;
}

const ReviewForm: FC<Props> = ({ isOpen }) => {
    const { isReviewOpen, reviewForm, setReviewForm } = useReview();

    const [score, setScore] = useState<number>(reviewForm.score);
    const [reviewTitle, setReviewTitle] = useState<string>(reviewForm.title);
    const [review, setReview] = useState<string>(reviewForm.review);

    const [reviewName, setReviewName] = useState<string>(reviewForm.name);
    const [isNameTyped, setIsNameTyped] = useState<boolean>(false);
    const [reviewEmail, setReviewEmail] = useState<string>(reviewForm.email);

    // Validations

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<ReviewFormType>();

    return (
        <div>
            {isReviewOpen && isOpen && (
                <motion.div
                    initial="hidden"
                    animate={isReviewOpen ? "visible" : "hidden"}
                    variants={containerMotion()}
                >
                    <form
                        aria-label="Write A Review For This Product"
                        className="block"
                        onSubmit={handleSubmit((data) => console.log(data))}
                    >
                        <Container>
                            <h2>Write a review</h2>
                            <div className="flex flex-col mb-6 w-max">
                                <span className="mb-2 font-bold text-accents-8">
                                    Score: {errors.score?.message}
                                </span>
                                <RatingStyle
                                    {...(register("title", {
                                        required: "Review's score can't be 0",
                                    }) as unknown)}
                                    customSize="large"
                                    value={score}
                                    readOnly={false}
                                    precision={1}
                                    onChange={(event, newValue) => {
                                        setScore(newValue as number);
                                        setReviewForm({
                                            ...reviewForm,
                                            score: newValue as number,
                                        });
                                    }}
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="review-title"
                                    className="flex flex-col cursor-pointer"
                                >
                                    <span className="font-bold mb-2">
                                        Title: {errors.title?.message}
                                    </span>
                                    <FormInput
                                        {...register("title", {
                                            required:
                                                "Review's title & body can't be empty",
                                        })}
                                        id="review-title"
                                        type="text"
                                        value={reviewTitle}
                                        aria-required
                                        maxLength={150}
                                        onChange={(e) => {
                                            setReviewTitle(e.target.value);
                                        }}
                                        autoComplete="review-title"
                                    />
                                </label>
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="review-content"
                                    className="flex flex-col cursor-pointer"
                                >
                                    <span className="font-bold mb-2">
                                        Review:
                                    </span>
                                    <FormTextArea
                                        id="review-content"
                                        aria-required
                                        value={review}
                                        onChange={(e) => {
                                            setReview(e.target.value);
                                        }}
                                        autoComplete="review-content"
                                    />
                                </label>
                            </div>

                            <ReviewFormChecks />

                            <div className="mb-6">
                                <label
                                    htmlFor="review-name"
                                    className="flex flex-col cursor-pointer"
                                >
                                    <span className="font-bold mb-2">
                                        Use your name:
                                    </span>
                                    <FormInput
                                        id="review-name"
                                        type="text"
                                        value={reviewName}
                                        aria-required
                                        maxLength={150}
                                        onChange={(e) => {
                                            if (e.target.value.length > 0)
                                                setIsNameTyped(true);
                                            setReviewName(e.target.value);
                                        }}
                                        autoComplete="review-name"
                                    />
                                </label>
                            </div>
                            {isNameTyped && (
                                <motion.div
                                    className="mb-6"
                                    animate={{ opacity: [0, 1] }}
                                >
                                    <label
                                        htmlFor="review-email"
                                        className="flex flex-col cursor-pointer"
                                    >
                                        <span className="font-bold mb-2">
                                            Email:
                                        </span>
                                        <FormInput
                                            id="review-email"
                                            type="email"
                                            value={reviewEmail}
                                            aria-required
                                            maxLength={150}
                                            onChange={(e) => {
                                                setReviewEmail(e.target.value);
                                            }}
                                            autoComplete="review-email"
                                        />
                                    </label>
                                </motion.div>
                            )}
                            <FunctionalBtn
                                isHoverActive={false}
                                $isSelected
                                type="submit"
                                className="ml-auto w-1/2"
                            >
                                Post
                            </FunctionalBtn>
                        </Container>
                    </form>
                </motion.div>
            )}
        </div>
    );
};

export default ReviewForm;
