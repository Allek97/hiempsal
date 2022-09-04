/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from "axios";
import { FC, useState } from "react";
import RatingStyle from "@components/elements/RatingStyle";
import { AnimatePresence, motion } from "framer-motion";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, string, object, number, ValidationError } from "yup";
import isEmailValidator from "validator/lib/isEmail";

import useAddReview from "@framework/review/use-add-review";
import useReview from "@framework/review/use-review";

import { Review } from "@framework/types/review";
import { useProduct } from "@components/product/context";

import { FunctionalBtn } from "../Commun/FunctionalBtn.styled";
import {
    CheckErrors,
    defaultReviewForm,
    ReviewFormType,
    useReviewContext,
} from "../context";
import { ReviewFormChecks } from "./reviewFormChecks";
import Confirmation from "../Commun/Confirmation";
import { formMotion } from "../Commun/FormMotions";
import {
    Container,
    FormError,
    FormInput,
    FormTextArea,
} from "../Commun/Form.styled";

const formSchema: SchemaOf<Omit<ReviewFormType, "checks">> = object({
    score: number()
        .min(1, "Review's score is required")
        .max(5, "Review's score can't exceed 5")
        .required("Review's score can't be 0"),
    title: string().required("Review's title & body can't be empty"),
    review: string().required("Review's title & body can't be empty"),
    name: string().required("You need to use your name"),
    // NOTE: https://github.com/jquense/yup/issues/507
    email: string()
        .email("Please enter a valid email address")
        .required("Email address is required")
        .test(
            "is-valid",
            () => `Please enter a valid email address`,
            (value) =>
                value
                    ? isEmailValidator(value)
                    : new ValidationError("Invalid value")
        ),
});

interface Props {
    productId: string;
}

const ReviewForm: FC<Props> = ({ productId }) => {
    const {
        isReviewUIOpen,
        reviewForm,
        checkErrors,
        isReviewSubmitted,
        setReviewSubmission,
        setReviewForm,
        setCheckErrors,
    } = useReviewContext();
    const { productType } = useProduct();

    const [serverError, setServerError] = useState<string>("");

    // Validations
    const methods = useForm<Partial<ReviewFormType>>({
        resolver: yupResolver(formSchema),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        reset,
    } = methods;

    function handleCheckErrors() {
        let updatedCheckErrors: CheckErrors = { ...checkErrors };
        Object.entries(reviewForm.checks).forEach(([key, value]) => {
            if (value === "") {
                updatedCheckErrors = {
                    ...updatedCheckErrors,
                    [key]: { message: "You need to select one option" },
                };
            } else delete updatedCheckErrors[key];
        });

        setCheckErrors(updatedCheckErrors);

        if (Object.keys(updatedCheckErrors).length >= 1)
            throw Error("You need to select the options above");
    }

    const addReview = useAddReview();
    const getReviews = useReview();
    const { mutate } = getReviews({ productId: productId });

    async function onSubmit(): Promise<void> {
        try {
            handleCheckErrors();
            setServerError("");

            const {
                checks,
                name,
                email,
                title,
                review: formReview,
                score,
            } = reviewForm;

            const review: Omit<Review, "ratingsAverage"> = {
                score,
                email: email.trim(),
                name: name.trim(),
                title: title.trim(),
                review: formReview.trim(),
                productId: productId,
                productType: productType,
                clothChecks:
                    productType === "clothing"
                        ? ({ ...checks } as Review["clothChecks"])
                        : undefined,
                techChecks:
                    productType === "technology"
                        ? ({ ...checks } as Review["techChecks"])
                        : undefined,
            };

            await addReview(review);
            mutate();

            setCheckErrors({});
            setServerError("");
            setReviewSubmission(true);
            reset(defaultReviewForm);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if ((error.response as any)?.data.err.code === 11000)
                    setServerError("This email has already been used");
                else setServerError("Server error please retry in few moments");
            } else if ((error as Error).message)
                setServerError((error as Error).message);
            else setServerError("Server error please retry in few moments");
        }
    }

    return (
        <div>
            {isReviewSubmitted && <Confirmation isReview />}
            <AnimatePresence>
                {isReviewUIOpen ? (
                    <motion.div
                        initial="hidden"
                        animate={isReviewUIOpen ? "visible" : "hidden"}
                        exit="exit"
                        variants={formMotion}
                        className="overflow-hidden"
                    >
                        <form
                            aria-label="Write A Review"
                            className="block"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Container>
                                <h2 className="w-max mb-6 font-bold text-accents-8">
                                    Write a review
                                </h2>
                                <div className="flex flex-col mb-6 w-max">
                                    <span className="flex mb-2 font-bold text-accents-8">
                                        Score:{" "}
                                        <FormError className="ml-1">
                                            {errors.score?.message}
                                        </FormError>
                                    </span>
                                    <Controller
                                        name="score"
                                        control={control}
                                        defaultValue={reviewForm.score}
                                        render={({
                                            field: { value, onChange },
                                        }) => (
                                            <RatingStyle
                                                name="score"
                                                customSize="large"
                                                value={Number(
                                                    value ?? reviewForm.score
                                                )}
                                                readOnly={false}
                                                precision={1}
                                                onChange={(event, newValue) => {
                                                    setReviewForm({
                                                        ...reviewForm,
                                                        score: Number(newValue),
                                                    });
                                                    onChange(
                                                        event,
                                                        Number(newValue)
                                                    );
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="review-title"
                                        className="flex flex-col cursor-pointer"
                                    >
                                        <span className="flex font-bold mb-2">
                                            Title:
                                            <FormError className="ml-1">
                                                {errors.title?.message}
                                            </FormError>
                                        </span>
                                        <FormInput
                                            {...register("title")}
                                            id="review-title"
                                            type="text"
                                            value={reviewForm.title}
                                            aria-required
                                            maxLength={150}
                                            onChange={(e) => {
                                                setReviewForm({
                                                    ...reviewForm,
                                                    title: e.target.value,
                                                });
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
                                        <span className="flex font-bold mb-2">
                                            Review:{" "}
                                            <FormError className="ml-1">
                                                {errors.review?.message}
                                            </FormError>
                                        </span>
                                        <FormTextArea
                                            {...register("review")}
                                            id="review-content"
                                            aria-required
                                            value={reviewForm.review}
                                            onChange={(e) => {
                                                setReviewForm({
                                                    ...reviewForm,
                                                    review: e.target.value,
                                                });
                                            }}
                                            autoComplete="review-content"
                                        />
                                    </label>
                                </div>
                                <FormProvider {...methods}>
                                    <ReviewFormChecks />
                                </FormProvider>

                                <div className="mb-6">
                                    <label
                                        htmlFor="review-name"
                                        className="flex flex-col cursor-pointer"
                                    >
                                        <span className="flex font-bold mb-2">
                                            Use your name:{" "}
                                            <FormError className="ml-1">
                                                {errors.name?.message}
                                            </FormError>
                                        </span>
                                        <FormInput
                                            {...register("name")}
                                            id="review-name"
                                            type="text"
                                            value={reviewForm.name}
                                            aria-required
                                            maxLength={150}
                                            onChange={(e) =>
                                                setReviewForm({
                                                    ...reviewForm,
                                                    name: e.target.value,
                                                })
                                            }
                                            autoComplete="review-name"
                                        />
                                    </label>
                                </div>
                                {(reviewForm.email.length > 0 ||
                                    reviewForm.name.length > 0) && (
                                    <motion.div
                                        className="mb-6"
                                        animate={{ opacity: [0, 1] }}
                                    >
                                        <label
                                            htmlFor="review-email"
                                            className="flex flex-col cursor-pointer"
                                        >
                                            <span className="flex font-bold mb-2">
                                                Email:{" "}
                                                <FormError className="ml-1">
                                                    {errors.email?.message}{" "}
                                                    {serverError.startsWith(
                                                        "This email"
                                                    )
                                                        ? serverError
                                                        : ""}
                                                </FormError>
                                            </span>
                                            <FormInput
                                                {...register("email")}
                                                id="review-email"
                                                type="email"
                                                value={reviewForm.email}
                                                aria-required
                                                maxLength={150}
                                                onChange={(e) => {
                                                    setReviewForm({
                                                        ...reviewForm,
                                                        email: e.target.value,
                                                    });
                                                }}
                                                autoComplete="review-email"
                                            />
                                        </label>
                                    </motion.div>
                                )}
                                <div className="flex items-center justify-center flex-1">
                                    <FormError className="w-1/2">
                                        {!serverError.startsWith("This email")
                                            ? serverError
                                            : ""}
                                    </FormError>
                                    <FunctionalBtn
                                        isHoverActive={false}
                                        $isSelected
                                        type="submit"
                                        className="ml-auto w-1/2"
                                    >
                                        Post
                                    </FunctionalBtn>
                                </div>
                            </Container>
                        </form>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
};

export default ReviewForm;
