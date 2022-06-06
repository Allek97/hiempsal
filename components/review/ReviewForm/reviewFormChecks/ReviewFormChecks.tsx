import { FC } from "react";
import { Checkbox } from "@mui/material";

import { FormError } from "@components/review/Commun/FormError.styled";
import { useReviewContext } from "@components/review/context";

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
    const { reviewForm, setReviewForm, checkErrors } = useReviewContext();

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
