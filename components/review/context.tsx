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

export type CheckErrors = {
    [id: string]: {
        message?: string;
    };
};

export const defaultReviewForm: ReviewFormType = {
    score: 0,
    title: "",
    review: "",
    checks: { fit: "", durability: "", integrity: "" },
    name: "",
    email: "",
};

interface StateValues {
    isReviewOpen: boolean;
    isReviewUIOpen: boolean;
    reviewForm: ReviewFormType;
    checkErrors: CheckErrors;
    isReviewSubmitted: boolean;
}

interface StateModifiers {
    openReview: () => void;
    closeReview: () => void;
    openReviewUI: () => void;
    closeReviewUI: () => void;
    setReviewForm: (payload: ReviewFormType) => void;
    setCheckErrors: (payload: CheckErrors) => void;
    setReviewSubmission: (payload: boolean) => void;
}

export type State = StateValues & StateModifiers;

const initialState: StateValues = {
    isReviewOpen: true,
    reviewForm: defaultReviewForm,
    checkErrors: {},
    isReviewSubmitted: false,
    isReviewUIOpen: false,
};

const stateModifiers: StateModifiers = {
    openReview: () => {},
    closeReview: () => {},
    setReviewForm: () => {},
    setCheckErrors: () => {},
    setReviewSubmission: () => {},
    openReviewUI: () => {},
    closeReviewUI: () => {},
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
        | "CLOSE_REVIEW_UI"
        | "SET_REVIEW_FORM"
        | "SET_CHECK_ERRORS"
        | "SET_REVIEW_SUBMISSION_STATUS";
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
                isReviewUIOpen: true,
                isReviewOpen: true,
            };
        case "CLOSE_REVIEW_UI":
            return { ...state, isReviewUIOpen: false };
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
                };
            }
            return {
                ...state,
                isReviewSubmitted: false,
                isReviewUIOpen: false,
            };

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
    const setReviewSubmission = (payload: boolean) =>
        dispatch({ type: "SET_REVIEW_SUBMISSION_STATUS", payload: payload });
    const openReviewUI = () => dispatch({ type: "OPEN_REVIEW_UI" });
    const closeReviewUI = () => dispatch({ type: "CLOSE_REVIEW_UI" });

    const value: State = useMemo(() => {
        return {
            ...state,
            openReview,
            closeReview,
            openReviewUI,
            closeReviewUI,
            setReviewForm,
            setCheckErrors,
            setReviewSubmission,
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