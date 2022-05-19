/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, FC, useContext, useMemo, useReducer } from "react";

interface StateValues {
    isReviewOpen: boolean;
}

interface StateModifiers {
    openReview: () => void;
    closeReview: () => void;
}

export type State = StateValues & StateModifiers;

const initialState: StateValues = {
    isReviewOpen: true,
};

const stateModifiers: StateModifiers = {
    openReview: () => {},
    closeReview: () => {},
};

export const ReviewContext = createContext<State>({
    ...initialState,
    ...stateModifiers,
});

type Action = {
    type: "OPEN_REVIEW" | "CLOSE_REVIEW";
    payload?: any;
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

        default:
            return { ...state };
    }
}

const ReviewProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(reviewReducer, initialState);

    const openReview = () => dispatch({ type: "OPEN_REVIEW" });
    const closeReview = () => dispatch({ type: "CLOSE_REVIEW" });

    const value: State = useMemo(() => {
        return {
            ...state,
            openReview,
            closeReview,
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
