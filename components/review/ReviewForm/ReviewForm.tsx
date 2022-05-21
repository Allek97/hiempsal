/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC, useState } from "react";
import { Checkbox } from "@mui/material";
import RatingStyle from "@components/elements/RatingStyle";
import { motion, Variants } from "framer-motion";
import {
    CheckBoxLabel,
    Container,
    FormInput,
    FormTextArea,
} from "./ReviewForm.styled";
import { FunctionalBtn } from "../Commun/FunctionalBtn.styled";
import { useReview } from "../context";

type CheckOptions = {
    question: string;
    options: string[];
};

const fitOptions: CheckOptions = {
    question: "How does it fit?",
    options: ["Too tight", "Too small", "True to size", "Too big"],
};
const durabilityOptions: CheckOptions = {
    question: "How would you rate the product's durability?",
    options: ["Very poor", "poor", "okay", "durable", "extremely durable"],
};
const integrityOptions: CheckOptions = {
    question: "Does this product look like it's advertised?",
    options: ["Very misleading", "Small difference", "As advertised"],
};

const checkOptions: CheckOptions[] = [
    fitOptions,
    durabilityOptions,
    integrityOptions,
];

const ReviewForm: FC = () => {
    const [score, setScore] = useState<number>(1);
    const [reviewTitle, setReviewTitle] = useState<string>("");
    const [review, setReview] = useState<string>("");
    const [checked, setChecked] = useState<number[]>(
        Array(checkOptions.length).fill(-1)
    );
    const [reviewName, setReviewName] = useState<string>("");
    const [isNameTyped, setIsNameTyped] = useState<boolean>(false);
    const [reviewEmail, setReviewEmail] = useState<string>("");

    const { isReviewOpen } = useReview();

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

    return (
        <div>
            {isReviewOpen && (
                <motion.div
                    initial="hidden"
                    animate={isReviewOpen ? "visible" : "hidden"}
                    variants={containerMotion()}
                >
                    <form
                        aria-label="Write A Review For This Product"
                        className="block"
                    >
                        <Container>
                            <h2>Write a review</h2>
                            <div className="flex flex-col mb-6 w-max">
                                <span className="mb-2 font-bold text-accents-8">
                                    Score:
                                </span>
                                <RatingStyle
                                    customSize="large"
                                    value={score}
                                    readOnly={false}
                                    precision={1}
                                    onChange={(event, newValue) => {
                                        setScore(newValue as number);
                                    }}
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="review-title"
                                    className="flex flex-col cursor-pointer"
                                >
                                    <span className="font-bold mb-2">
                                        Title:
                                    </span>
                                    <FormInput
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
                            <div className="mb-6">
                                {checkOptions &&
                                    checkOptions.map(
                                        ({ question, options }, checkIdx) => (
                                            <div
                                                className="mb-6 w-max"
                                                key={question}
                                            >
                                                <span className="block font-bold mb-2">
                                                    {question}
                                                </span>
                                                <div className="flex flex-col cursor-pointer">
                                                    {options.map((el, idx) => (
                                                        <CheckBoxLabel
                                                            htmlFor={`review-${el}`}
                                                            className="flex items-center cursor-pointer"
                                                            key={el}
                                                            onChange={() => {
                                                                setChecked(
                                                                    (
                                                                        previous
                                                                    ) => {
                                                                        const newChecked =
                                                                            [
                                                                                ...previous,
                                                                            ];
                                                                        newChecked[
                                                                            checkIdx
                                                                        ] = idx;
                                                                        return newChecked;
                                                                    }
                                                                );
                                                            }}
                                                        >
                                                            <Checkbox
                                                                id={`review-${el}`}
                                                                checked={
                                                                    idx ===
                                                                    checked[
                                                                        checkIdx
                                                                    ]
                                                                }
                                                            />
                                                            <span>{el}</span>
                                                        </CheckBoxLabel>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    )}
                            </div>

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
