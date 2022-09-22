/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, FC, useContext, useMemo, useReducer } from "react";

interface StateValues {
    isMobileMenuOpen: boolean;
    isPopupOpen: boolean;
    isProductAdded: boolean;
    isProductCartOpen: boolean;
    isHelpOpen: boolean;
    isReviewOpen: boolean;
}

interface StateModifiers {
    openMobileMenu: () => void;
    closeMobileMenu: () => void;
    openPopup: () => void;
    closePopup: () => void;
    openProductCart: () => void;
    closeProductCart: () => void;
    setProductAdded: () => void;
    setProductNotAdded: () => void;
    openHelp: () => void;
    closeHelp: () => void;
    openReview: () => void;
    closeReview: () => void;
    resetUI: () => void;
}

export type State = StateValues & StateModifiers;

const initialState: StateValues = {
    isMobileMenuOpen: false,
    isPopupOpen: false,
    isProductAdded: false,
    isProductCartOpen: false,
    isHelpOpen: false,
    isReviewOpen: false,
};

const stateModifiers: StateModifiers = {
    openMobileMenu: () => {},
    closeMobileMenu: () => {},
    openPopup: () => {},
    closePopup: () => {},
    openProductCart: () => {},
    closeProductCart: () => {},
    setProductAdded: () => {},
    setProductNotAdded: () => {},
    openHelp: () => {},
    closeHelp: () => {},
    openReview: () => {},
    closeReview: () => {},
    resetUI: () => {},
};

export const UIContext = createContext<State>({
    ...initialState,
    ...stateModifiers,
});

type Action = {
    type:
        | "OPEN_MOBILE_MENU"
        | "CLOSE_MOBILE_MENU"
        | "OPEN_POPUP"
        | "CLOSE_POPUP"
        | "SET_PRODUCT_AS_ADDED"
        | "SET_PRODUCT_AS_NOT_ADDED"
        | "OPEN_PRODUCT_CART"
        | "CLOSE_PRODUCT_CART"
        | "OPEN_HELP"
        | "CLOSE_HELP"
        | "OPEN_REVIEW"
        | "CLOSE_REVIEW"
        | "RESET";
    payload?: any;
};

function uiReducer(state: StateValues, action: Action) {
    switch (action.type) {
        case "OPEN_MOBILE_MENU":
            return {
                ...state,
                isMobileMenuOpen: true,
            };
        case "CLOSE_MOBILE_MENU":
            return {
                ...state,
                isMobileMenuOpen: false,
            };
        case "OPEN_POPUP":
            return { ...state, isPopupOpen: true };

        case "CLOSE_POPUP":
            return {
                ...state,
                isPopupOpen: false,
                isProductAdded: false,
                isProductCartOpen: false,
                isHelpOpen: false,
            };

        case "SET_PRODUCT_AS_ADDED":
            return {
                ...state,
                isPopupOpen: true,
                isProductAdded: true,
                isProductCartOpen: false,
                isReviewOpen: false,
            };

        case "SET_PRODUCT_AS_NOT_ADDED":
            return { ...state, isProductAdded: false };

        case "OPEN_PRODUCT_CART":
            return {
                ...state,
                isPopupOpen: true,
                isProductCartOpen: true,
                isProductAdded: false,
                isReviewOpen: false,
            };

        case "CLOSE_PRODUCT_CART":
            return { ...state, isProductCartOpen: false };

        case "OPEN_HELP":
            return { ...state, isHelpOpen: true, isPopupOpen: true };
        case "CLOSE_HELP":
            return { ...state, isHelpOpen: false };
        case "OPEN_REVIEW":
            return {
                ...state,
                isPopupOpen: true,
                isReviewOpen: true,
                isProductCartOpen: false,
                isProductAdded: false,
            };
        case "CLOSE_REVIEW":
            return { ...state, isReviewOpen: false };
        case "RESET":
            return { ...initialState };

        default:
            return { ...state };
    }
}

const UIProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, initialState);

    const openMobileMenu = () => {
        dispatch({ type: "OPEN_MOBILE_MENU" });
    };
    const closeMobileMenu = () => {
        dispatch({ type: "CLOSE_MOBILE_MENU" });
    };
    const openPopup = () => dispatch({ type: "OPEN_POPUP" });
    const closePopup = () => dispatch({ type: "CLOSE_POPUP" });
    const setProductAdded = () => dispatch({ type: "SET_PRODUCT_AS_ADDED" });
    const setProductNotAdded = () =>
        dispatch({ type: "SET_PRODUCT_AS_NOT_ADDED" });
    const openProductCart = () => dispatch({ type: "OPEN_PRODUCT_CART" });
    const closeProductCart = () => dispatch({ type: "CLOSE_PRODUCT_CART" });
    const openHelp = () => dispatch({ type: "OPEN_HELP" });
    const closeHelp = () => dispatch({ type: "CLOSE_HELP" });
    const openReview = () => dispatch({ type: "OPEN_REVIEW" });
    const closeReview = () => dispatch({ type: "CLOSE_REVIEW" });
    const resetUI = () => dispatch({ type: "RESET" });

    const value: State = useMemo(() => {
        return {
            ...state,
            openMobileMenu,
            closeMobileMenu,
            openPopup,
            closePopup,
            setProductAdded,
            setProductNotAdded,
            openProductCart,
            closeProductCart,
            openHelp,
            closeHelp,
            openReview,
            closeReview,
            resetUI,
        };
    }, [state]);

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
    const context = useContext(UIContext);
    return context;
};

export default UIProvider;
