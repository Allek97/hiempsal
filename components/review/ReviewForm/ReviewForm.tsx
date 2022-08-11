/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from "axios";
import { FC } from "react";
import RatingStyle from "@components/elements/RatingStyle";
import { motion, Variants } from "framer-motion";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaOf, string, object, number, ValidationError } from "yup";
import isEmailValidator from "validator/lib/isEmail";

import useAddReview from "@framework/review/use-add-review";
import useReview from "@framework/review/use-review";

import { Review } from "@framework/types/review";
import { useProduct } from "@components/product/context";

import { Container, FormInput, FormTextArea } from "./ReviewForm.styled";
import { FunctionalBtn } from "../Commun/FunctionalBtn.styled";
import {
    CheckErrors,
    defaultReviewForm,
    ReviewFormType,
    useReviewContext,
} from "../context";
import { ReviewFormChecks } from "./reviewFormChecks";
import { FormError } from "../Commun/FormError.styled";

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

const ReviewForm: FC = () => {
    const {
        isReviewUIOpen,
        reviewForm,
        checkErrors,
        setReviewSubmission,
        setReviewForm,
        setCheckErrors,
    } = useReviewContext();
    const { productId, productType } = useProduct();

    // Validations

    const methods = useForm<Partial<ReviewFormType>>({
        resolver: yupResolver(formSchema),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
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
    }

    const addReview = useAddReview();
    const getReviews = useReview();
    const { mutate } = getReviews({ productId: productId });

    async function onSubmit() {
        try {
            handleCheckErrors();

            const { checks, ...rest } = reviewForm;

            const review: Omit<Review, "ratingsAverage"> = {
                ...rest,
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

            setReviewSubmission(true);
            setReviewForm(defaultReviewForm);
            setCheckErrors({});
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log((error.response?.data as any).err.message);
            } else {
                console.log("Server error please retry");
            }
        }
    }

    return (
        <div>
            {isReviewUIOpen && (
                <motion.div
                    initial="hidden"
                    animate={isReviewUIOpen ? "visible" : "hidden"}
                    variants={containerMotion()}
                    className="overflow-hidden"
                >
                    <form
                        aria-label="Write A Review For This Product"
                        className="block"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Container>
                            <h2 className="w-max">Write a review</h2>
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
                                        {...register("title", {
                                            required:
                                                "Review's title & body can't be empty",
                                        })}
                                        id="review-title"
                                        type="text"
                                        value={reviewForm.title}
                                        aria-required
                                        maxLength={150}
                                        onChange={(e) => {
                                            setReviewForm({
                                                ...reviewForm,
                                                title: e.target.value.trim(),
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
                                        {...register("review", {
                                            required:
                                                "Review's title & body can't be empty",
                                        })}
                                        id="review-content"
                                        aria-required
                                        value={reviewForm.review}
                                        onChange={(e) => {
                                            setReviewForm({
                                                ...reviewForm,
                                                review: e.target.value.trim(),
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
                                        {...register("name", {
                                            required:
                                                "You need to use your name",
                                        })}
                                        id="review-name"
                                        type="text"
                                        value={reviewForm.name}
                                        aria-required
                                        maxLength={150}
                                        onChange={(e) =>
                                            setReviewForm({
                                                ...reviewForm,
                                                name: e.target.value.trim(),
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
                                                {errors.email?.message}
                                            </FormError>
                                        </span>
                                        <FormInput
                                            {...register("email", {
                                                required:
                                                    "You need to add you email adress",
                                            })}
                                            id="review-email"
                                            type="email"
                                            value={reviewForm.email}
                                            aria-required
                                            maxLength={150}
                                            onChange={(e) => {
                                                setReviewForm({
                                                    ...reviewForm,
                                                    email: e.target.value.trim(),
                                                });
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
                                // onClick={() => handleCheckErrors()}
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
