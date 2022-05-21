/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, FC, useContext, useMemo, useReducer } from "react";

type ReviewForm = {
    score: number;
    title?: string;
    review: string;
    fit: string;
    functionality: string;
    use: string;
    durability: string;
    name?: string;
    email?: string;
};

const defaultReviewForm: ReviewForm = {
    score: 0,
    title: "",
    review: "",
    fit: "",
    functionality: "",
    use: "",
    durability: "",
    name: "",
    email: "",
};

interface StateValues {
    isReviewOpen: boolean;
    reviewForm: ReviewForm;
}

interface StateModifiers {
    openReview: () => void;
    closeReview: () => void;
    setReviewForm: (payload: ReviewForm) => void;
}

export type State = StateValues & StateModifiers;

const initialState: StateValues = {
    isReviewOpen: true,
    reviewForm: defaultReviewForm,
};

const stateModifiers: StateModifiers = {
    openReview: () => {},
    closeReview: () => {},
    setReviewForm: () => {},
};

export const ReviewContext = createContext<State>({
    ...initialState,
    ...stateModifiers,
});

type Action = {
    type: "OPEN_REVIEW" | "CLOSE_REVIEW" | "SET_REVIEW_FORM";
    payload?: ReviewForm | any;
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
        case "SET_REVIEW_FORM":
            if (action.payload as ReviewForm) {
                return { ...state, reviewForm: { ...action.payload } };
            }
            return { ...state };

        default:
            return { ...state };
    }
}

const ReviewProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(reviewReducer, initialState);

    const openReview = () => dispatch({ type: "OPEN_REVIEW" });
    const closeReview = () => dispatch({ type: "CLOSE_REVIEW" });
    const setReviewForm = (payload: ReviewForm) =>
        dispatch({ type: "SET_REVIEW_FORM", payload: payload });

    const value: State = useMemo(() => {
        return {
            ...state,
            openReview,
            closeReview,
            setReviewForm,
        };
    }, [state]);

    return (
        <ReviewContext.Provider value={value}>
            {children}
        </ReviewContext.Provider>
    );
};

export const useReview = () => {
    const context = useContext(ReviewContext);
    return context;
};

export default ReviewProvider;
