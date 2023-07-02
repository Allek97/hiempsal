import { FC, useMemo } from "react";
import { Checkbox } from "@mui/material";

import { FormError } from "@components/review/Commun/Form.styled";
import { useReviewContext } from "@components/review/context";

import { CheckBoxLabel } from "./ReviewFormChecks.styled";

type CheckOptions = {
    id:
        | "fit"
        | "durability"
        | "integrity"
        | "battery"
        | "design"
        | "usability"
        | "performance";
    question: string;
    options: string[];
};

// Clothing
const fitOptions: CheckOptions = {
    id: "fit",
    question: "How does it fit?",
    options: ["Too tight", "Too small", "True to size", "Too big"],
};
const durabilityOptions: CheckOptions = {
    id: "durability",
    question: "How would you rate the product's durability?",
    options: ["Very poor", "Poor", "Okay", "Durable", "Extremely durable"],
};
const integrityOptions: CheckOptions = {
    id: "integrity",
    question: "Does this product look like it's advertised?",
    options: ["Very misleading", "Small difference", "As advertised"],
};

// Technology

const batteryOptions: CheckOptions = {
    id: "battery",
    question: "How would you rate the battery's quality",
    options: [
        "Poor battery life",
        "Good battery life",
        "Excellent battery life",
    ],
};
const designOptions: CheckOptions = {
    id: "design",
    question: "How would you rate this product's design?",
    options: [
        "Not attractive",
        "Heavy and complicated",
        "Stylish and lightweight",
        "Top quality design",
    ],
};
const usabilityOptions: CheckOptions = {
    id: "usability",
    question: "Is this product easy to manipulate and use?",
    options: ["Very complicated", "Needs adjustment time", "Very intuitive"],
};
const performanceOptions: CheckOptions = {
    id: "performance",
    question: "How would you rate this product's performance rate?",
    options: [
        "Below average",
        "Satisfactory",
        "Very good",
        "Excellent",
        "Outstanding",
    ],
};

interface Props {
    productType: "clothing" | "technology";
}

const ReviewFormChecks: FC<Props> = ({ productType }) => {
    const { reviewForm, setReviewForm, checkErrors } = useReviewContext();

    const checkOptions: CheckOptions[] = useMemo(
        () =>
            productType === "clothing"
                ? [fitOptions, durabilityOptions, integrityOptions]
                : [
                      batteryOptions,
                      designOptions,
                      usabilityOptions,
                      performanceOptions,
                  ],
        [productType]
    );

    return (
        <div className="mb-6">
            {checkOptions &&
                checkOptions.map(({ id: optionId, question, options }) => (
                    <div className="mb-6" key={question}>
                        <span className="block font-bold mb-2">{question}</span>
                        <span className="block font-bold mb-2 w-full">
                            <FormError>
                                {checkErrors?.[optionId]?.message}
                            </FormError>
                        </span>
                        <div className="flex flex-col cursor-pointer w-max">
                            {options.map((el) => {
                                return (
                                    <CheckBoxLabel
                                        htmlFor={`review-${el}`}
                                        className="flex items-center cursor-pointer"
                                        key={el}
                                        onChange={() => {
                                            setReviewForm({
                                                ...reviewForm,
                                                checks: {
                                                    ...reviewForm.checks,
                                                    [optionId]: el.trim(),
                                                },
                                            });
                                        }}
                                    >
                                        <Checkbox
                                            id={`review-${el}`}
                                            checked={
                                                el ===
                                                reviewForm.checks[optionId]
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
