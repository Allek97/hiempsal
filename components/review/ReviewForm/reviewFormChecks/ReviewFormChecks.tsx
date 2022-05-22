import { FC, useState } from "react";
import { Checkbox } from "@mui/material";
import { useForm } from "react-hook-form";
import { ReviewFormType, useReview } from "@components/review/context";

import { CheckBoxLabel } from "./ReviewFormChecks.styled";

type CheckOptions = {
    id: "fit" | "durability" | "integrity";
    question: string;
    options: string[];
};

const fitOptions: CheckOptions = {
    id: "fit",
    question: "How does it fit?",
    options: ["Too tight", "Too small", "True to size", "Too big"],
};
const durabilityOptions: CheckOptions = {
    id: "durability",
    question: "How would you rate the product's durability?",
    options: ["Very poor", "poor", "okay", "durable", "extremely durable"],
};
const integrityOptions: CheckOptions = {
    id: "integrity",
    question: "Does this product look like it's advertised?",
    options: ["Very misleading", "Small difference", "As advertised"],
};

const checkOptions: CheckOptions[] = [
    fitOptions,
    durabilityOptions,
    integrityOptions,
];

const ReviewFormChecks: FC = () => {
    const { reviewForm, setReviewForm } = useReview();

    type ReviewChecks = { id: CheckOptions["id"]; position: number };
    const [reviewChecks, setReviewChecks] = useState<ReviewChecks[]>(
        checkOptions.map((option) => ({
            id: option.id,
            position: reviewForm[option.id],
        }))
    );

    const {
        register,
        formState: { errors },
    } = useForm<ReviewFormType>();

    return (
        <div className="mb-6">
            {checkOptions &&
                checkOptions.map(({ id: optionId, question, options }) => (
                    <div className="mb-6 w-max" key={question}>
                        <span className="block font-bold mb-2">{question}</span>
                        <span className="block font-bold mb-2">
                            {errors[optionId]?.message}
                        </span>
                        <div className="flex flex-col cursor-pointer">
                            {options.map((el, idx) => {
                                const currentReviewCheck: ReviewChecks =
                                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                    reviewChecks.find(
                                        (option) => option.id === optionId
                                    )!;
                                return (
                                    <CheckBoxLabel
                                        htmlFor={`review-${el}`}
                                        className="flex items-center cursor-pointer"
                                        key={el}
                                        onChange={() => {
                                            const newReviewChecks =
                                                reviewChecks.map((option) => {
                                                    if (option.id === optionId)
                                                        option.position = idx;
                                                    return option;
                                                });

                                            setReviewChecks(newReviewChecks);
                                            setReviewForm({
                                                ...reviewForm,
                                                [currentReviewCheck.id]:
                                                    currentReviewCheck?.position,
                                            });
                                        }}
                                    >
                                        <Checkbox
                                            id={`review-${el}`}
                                            {...register(optionId, {
                                                required: `You need to select one ${optionId} option`,
                                            })}
                                            checked={
                                                idx ===
                                                currentReviewCheck?.position
                                            }
                                        />
                                        <span>{el}</span>
                                    </CheckBoxLabel>
                                );
                            })}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default ReviewFormChecks;
