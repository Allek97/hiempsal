/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, FC, useContext, useMemo, useReducer } from "react";

interface StateValues {
    isProductPopupOpen: boolean;
}

interface StateModifiers {
    openProductPopup: () => void;
    closeProductPopup: () => void;
}

type State = StateValues & StateModifiers;

const initialState: StateValues = {
    isProductPopupOpen: false,
};

const stateModifiers: StateModifiers = {
    openProductPopup: () => {},
    closeProductPopup: () => {},
};

const PopupUIContext = createContext<State>({
    ...initialState,
    ...stateModifiers,
});

type Action = {
    type: "OPEN_PRODUCT_POPUP" | "CLOSE_PRODUCT_POPUP";
};

function uiReducer(state: StateValues, action: Action) {
    switch (action.type) {
        case "OPEN_PRODUCT_POPUP":
            return { ...state, isProductPopupOpen: true };
        case "CLOSE_PRODUCT_POPUP":
            return { ...state, isProductPopupOpen: false };

        default:
            return { ...state };
    }
}

const PopupUIProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, initialState);

    const openProductPopup = () => dispatch({ type: "OPEN_PRODUCT_POPUP" });
    const closeProductPopup = () => dispatch({ type: "CLOSE_PRODUCT_POPUP" });

    const value: State = useMemo(() => {
        return {
            ...state,
            openProductPopup,
            closeProductPopup,
        };
    }, [state]);

    return (
        <PopupUIContext.Provider value={value}>
            {children}
        </PopupUIContext.Provider>
    );
};

export const usePopupUI = () => {
    const context = useContext(PopupUIContext);
    return context;
};

export default PopupUIProvider;
