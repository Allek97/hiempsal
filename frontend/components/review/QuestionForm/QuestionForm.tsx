/* eslint-disable jsx-a11y/label-has-for */
import axios from "axios";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { object, SchemaOf, string, ValidationError } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import isEmailValidator from "validator/lib/isEmail";

import useQuestion from "@framework/question/use-question";
import useAddQuestion from "@framework/question/use-add-question";

import {
    Container,
    FormError,
    FormInput,
    FormTextArea,
} from "../Commun/Form.styled";

import { formMotion } from "../Commun/FormMotions";
import { FunctionalBtn } from "../Commun/FunctionalBtn.styled";
import {
    defaultQuestionForm,
    QuestionFormType,
    useReviewContext,
} from "../context";
import Confirmation from "../Commun/Confirmation";

const formSchema: SchemaOf<QuestionFormType> = object({
    name: string().required("You need to use your name"),
    question: string().required("You need to write your question"),
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

const QuestionForm: FC<Props> = ({ productId }) => {
    const {
        questionForm,
        isQuestionUIOpen,
        isQuestionSubmitted,
        setQuestionForm,
        setQuestionSubmission,
    } = useReviewContext();

    const [serverError, setServerError] = useState<string>("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<QuestionFormType>({ resolver: yupResolver(formSchema) });

    const addQuestion = useAddQuestion();
    const getQuestions = useQuestion();
    const { mutate } = getQuestions({ productId: productId });
    async function onSubmit(): Promise<void> {
        try {
            await addQuestion({ productId, ...questionForm });
            mutate();

            setServerError("");
            setQuestionSubmission(true);
            reset(defaultQuestionForm);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if ((error.response as any)?.data.err.code === 11000)
                    setServerError("This email has already been used");
            } else if ((error as Error).message)
                setServerError((error as Error).message);
            else setServerError("Server error please retry in few moments");
        }
    }

    return (
        <div>
            {isQuestionSubmitted && <Confirmation isReview={false} />}
            {isQuestionUIOpen && (
                <motion.div
                    initial="hidden"
                    animate={isQuestionUIOpen ? "visible" : "hidden"}
                    exit="exit"
                    variants={formMotion}
                    className="overflow-hidden"
                >
                    <form
                        aria-label="Ask A Question"
                        className="block"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Container>
                            <h2 className="w-max mb-6 font-bold text-accents-8">
                                Ask a question
                            </h2>
                            <div className="mb-6">
                                <label
                                    htmlFor="quesion-content"
                                    className="flex flex-col cursor-pointer"
                                >
                                    <span className="flex font-bold mb-2">
                                        Question:{" "}
                                        <FormError className="ml-1">
                                            {errors.question?.message}
                                        </FormError>
                                    </span>
                                    <FormTextArea
                                        id="question-content"
                                        aria-required
                                        autoComplete="question-content"
                                        {...register("question")}
                                        value={questionForm.question}
                                        onChange={(e) => {
                                            setQuestionForm({
                                                ...questionForm,
                                                question: e.target.value,
                                            });
                                        }}
                                    />
                                </label>
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="question-name"
                                    className="flex flex-col cursor-pointer"
                                >
                                    <span className="flex font-bold mb-2">
                                        Use your name:{" "}
                                        <FormError className="ml-1">
                                            {errors.name?.message}
                                        </FormError>
                                    </span>
                                    <FormInput
                                        id="question-name"
                                        aria-required
                                        autoComplete="question-name"
                                        maxLength={150}
                                        type="text"
                                        {...register("name")}
                                        value={questionForm.name}
                                        onChange={(e) => {
                                            setQuestionForm({
                                                ...questionForm,
                                                name: e.target.value,
                                            });
                                        }}
                                    />
                                </label>
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="question-email"
                                    className="flex flex-col cursor-pointer"
                                >
                                    <span className="flex font-bold mb-2">
                                        Use your email:{" "}
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
                                        id="question-email"
                                        type="email"
                                        aria-required
                                        autoComplete="question-email"
                                        maxLength={150}
                                        {...register("email")}
                                        value={questionForm.email}
                                        onChange={(e) => {
                                            setQuestionForm({
                                                ...questionForm,
                                                email: e.target.value,
                                            });
                                        }}
                                    />
                                </label>
                            </div>
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
            )}
        </div>
    );
};

export default QuestionForm;
