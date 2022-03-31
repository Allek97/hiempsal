/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, FC, useContext, useMemo, useReducer } from "react";

interface StateValues {
    isMobileMenuOpen: boolean;
    isProductPopupOpen: boolean;
    isProductAdded: boolean;
    isProductCartOpen: boolean;
}

interface StateModifiers {
    toggleMobileMenu: () => void;
    openProductPopup: () => void;
    closeProductPopup: () => void;
    openProductCart: () => void;
    closeProductCart: () => void;
    setProductAdded: () => void;
    setProductNotAdded: () => void;
}

type State = StateValues & StateModifiers;

const initialState: StateValues = {
    isMobileMenuOpen: false,
    isProductPopupOpen: false,
    isProductAdded: false,
    isProductCartOpen: false,
};

const stateModifiers: StateModifiers = {
    toggleMobileMenu: () => {},
    openProductPopup: () => {},
    closeProductPopup: () => {},
    openProductCart: () => {},
    closeProductCart: () => {},
    setProductAdded: () => {},
    setProductNotAdded: () => {},
};

const UIContext = createContext<State>({
    ...initialState,
    ...stateModifiers,
});

type Action = {
    type:
        | "TOGGLE_MOBILE_MENU"
        | "OPEN_PRODUCT_POPUP"
        | "CLOSE_PRODUCT_POPUP"
        | "SET_PRODUCT_AS_ADDED"
        | "SET_PRODUCT_AS_NOT_ADDED"
        | "OPEN_PRODUCT_CART"
        | "CLOSE_PRODUCT_CART";
    payload?: any;
};

function uiReducer(state: StateValues, action: Action) {
    switch (action.type) {
        case "TOGGLE_MOBILE_MENU":
            return {
                ...state,
                isMobileMenuOpen: !state.isMobileMenuOpen,
            };
        case "OPEN_PRODUCT_POPUP":
            return { ...state, isProductPopupOpen: true };

        case "CLOSE_PRODUCT_POPUP":
            return {
                ...state,
                isProductPopupOpen: false,
            };

        case "SET_PRODUCT_AS_ADDED":
            return { ...state, isProductAdded: true };

        case "SET_PRODUCT_AS_NOT_ADDED":
            return { ...state, isProductAdded: false };

        case "OPEN_PRODUCT_CART":
            return { ...state, isProductCartOpen: true };

        case "CLOSE_PRODUCT_CART":
            return { ...state, isProductCartOpen: false };

        default:
            return { ...state };
    }
}

const UIProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, initialState);

    const toggleMobileMenu = () => {
        dispatch({ type: "TOGGLE_MOBILE_MENU" });
    };
    const openProductPopup = () => dispatch({ type: "OPEN_PRODUCT_POPUP" });
    const closeProductPopup = () => dispatch({ type: "CLOSE_PRODUCT_POPUP" });
    const setProductAdded = () => dispatch({ type: "SET_PRODUCT_AS_ADDED" });
    const setProductNotAdded = () =>
        dispatch({ type: "SET_PRODUCT_AS_NOT_ADDED" });
    const openProductCart = () => dispatch({ type: "OPEN_PRODUCT_CART" });
    const closeProductCart = () => dispatch({ type: "CLOSE_PRODUCT_CART" });

    const value = useMemo(() => {
        return {
            ...state,
            toggleMobileMenu,
            openProductPopup,
            closeProductPopup,
            setProductAdded,
            setProductNotAdded,
            openProductCart,
            closeProductCart,
        };
    }, [state]);

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
    const context = useContext(UIContext);
    return context;
};

export default UIProvider;
