/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, FC, useContext, useMemo, useReducer } from "react";

export type ReviewFormType = {
    score: number;
    title: string;
    review: string;
    checks: { [id: string]: string };
    name: string;
    email: string;
};
export type QuestionFormType = {
    question: string;
    name: string;
    email: string;
};

export type CheckErrors = {
    [id: string]: {
        message?: string;
    };
};

export const defaultReviewForm: ReviewFormType = {
    score: 0,
    title: "",
    review: "",
    checks: {
        fit: "",
        durability: "",
        integrity: "",
        battery: "",
        design: "",
        usability: "",
        performance: "",
    },
    name: "",
    email: "",
};
export const defaultQuestionForm: QuestionFormType = {
    question: "",
    name: "",
    email: "",
};

interface StateValues {
    isReviewOpen: boolean;
    isReviewUIOpen: boolean;
    isQuestionUIOpen: boolean;
    reviewForm: ReviewFormType;
    questionForm: QuestionFormType;
    checkErrors: CheckErrors;
    isReviewSubmitted: boolean;
    isQuestionSubmitted: boolean;
}

interface StateModifiers {
    openReview: () => void;
    closeReview: () => void;
    openReviewUI: () => void;
    openQuestionUI: () => void;
    setReviewForm: (payload: ReviewFormType) => void;
    setCheckErrors: (payload: CheckErrors) => void;
    setQuestionForm: (payload: QuestionFormType) => void;
    setReviewSubmission: (payload: boolean) => void;
    setQuestionSubmission: (payload: boolean) => void;
}

export type State = StateValues & StateModifiers;

const initialState: StateValues = {
    isReviewOpen: true,
    reviewForm: defaultReviewForm,
    questionForm: defaultQuestionForm,
    checkErrors: {},
    isReviewSubmitted: false,
    isReviewUIOpen: false,
    isQuestionUIOpen: false,
    isQuestionSubmitted: false,
};

const stateModifiers: StateModifiers = {
    openReview: () => {},
    closeReview: () => {},
    setReviewForm: () => {},
    setCheckErrors: () => {},
    setQuestionForm: () => {},
    openReviewUI: () => {},
    openQuestionUI: () => {},
    setReviewSubmission: () => {},
    setQuestionSubmission: () => {},
};

export const ReviewContext = createContext<State>({
    ...initialState,
    ...stateModifiers,
});

type Action = {
    type:
        | "OPEN_REVIEW"
        | "CLOSE_REVIEW"
        | "OPEN_REVIEW_UI"
        | "OPEN_QUESTION_UI"
        | "SET_REVIEW_FORM"
        | "SET_QUESTION_FORM"
        | "SET_CHECK_ERRORS"
        | "SET_REVIEW_SUBMISSION_STATUS"
        | "SET_QUESTION_SUBMISSION_STATUS"
        | "RESET";
    payload?: ReviewFormType | CheckErrors | boolean | any;
};

function reviewReducer(state: StateValues, action: Action) {
    switch (action.type) {
        case "OPEN_REVIEW":
            return {
                ...state,
                isReviewOpen: true,
            };
        case "CLOSE_REVIEW":
            return { ...state, isReviewOpen: false };
        case "OPEN_REVIEW_UI":
            return {
                ...state,
                isReviewOpen: true,
                isReviewUIOpen: true,
                isQuestionUIOpen: false,
            };
        case "OPEN_QUESTION_UI":
            return {
                ...state,
                isQuestionUIOpen: true,
                isReviewOpen: false,
                isReviewUIOpen: false,
            };
        case "SET_REVIEW_FORM":
            if (action.payload as ReviewFormType) {
                return { ...state, reviewForm: { ...action.payload } };
            }
            return { ...state };
        case "SET_CHECK_ERRORS":
            if (action.payload as CheckErrors) {
                return { ...state, checkErrors: { ...action.payload } };
            }
            return { ...state };
        case "SET_REVIEW_SUBMISSION_STATUS":
            if (action.payload as boolean) {
                return {
                    ...state,
                    isReviewSubmitted: true,
                    isReviewUIOpen: false,
                    reviewForm: defaultReviewForm,
                };
            }
            return {
                ...state,
                isReviewSubmitted: false,
            };
        case "SET_QUESTION_FORM":
            if (action.payload as QuestionFormType)
                return { ...state, questionForm: { ...action.payload } };
            return { ...state };
        case "SET_QUESTION_SUBMISSION_STATUS":
            if (action.payload as boolean) {
                return {
                    ...state,
                    isQuestionSubmitted: true,
                    isQuestionUIOpen: false,
                    questionForm: defaultQuestionForm,
                };
            }
            return {
                ...state,
                isQuestionSubmitted: false,
            };
        case "RESET":
            return { ...initialState };

        default:
            return { ...state };
    }
}

const ReviewProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(reviewReducer, initialState);

    const openReview = () => dispatch({ type: "OPEN_REVIEW" });
    const closeReview = () => dispatch({ type: "CLOSE_REVIEW" });
    const setReviewForm = (payload: ReviewFormType) =>
        dispatch({ type: "SET_REVIEW_FORM", payload: payload });
    const setCheckErrors = (payload: CheckErrors) =>
        dispatch({ type: "SET_CHECK_ERRORS", payload: payload });
    const setQuestionForm = (payload: QuestionFormType) =>
        dispatch({ type: "SET_QUESTION_FORM", payload: payload });
    const openReviewUI = () => dispatch({ type: "OPEN_REVIEW_UI" });
    const openQuestionUI = () => dispatch({ type: "OPEN_QUESTION_UI" });
    const setReviewSubmission = (payload: boolean) =>
        dispatch({ type: "SET_REVIEW_SUBMISSION_STATUS", payload: payload });
    const setQuestionSubmission = (payload: boolean) =>
        dispatch({ type: "SET_QUESTION_SUBMISSION_STATUS", payload: payload });

    const value: State = useMemo(() => {
        return {
            ...state,
            openReview,
            closeReview,
            openReviewUI,
            openQuestionUI,
            setReviewForm,
            setQuestionForm,
            setCheckErrors,
            setReviewSubmission,
            setQuestionSubmission,
        };
    }, [state]);

    return (
        <ReviewContext.Provider value={value}>
            {children}
        </ReviewContext.Provider>
    );
};

export const useReviewContext = () => {
    const context = useContext(ReviewContext);
    return context;
};

export default ReviewProvider;
