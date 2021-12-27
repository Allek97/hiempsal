/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, FC, useContext, useMemo, useReducer } from "react";

interface StateValues {
    isUsernavOpen: boolean;
    isCartOpen: boolean;
    isWishListOpen: boolean;
    isViewedProductsOpen: boolean;
}

interface StateModifiers {
    closeUsernav: () => void;
    openCart: () => void;
    openWishList: () => void;
    openViewedProducts: () => void;
}

type State = StateValues & StateModifiers;

const initialState: StateValues = {
    isUsernavOpen: false,
    isCartOpen: false,
    isWishListOpen: false,
    isViewedProductsOpen: false,
};

const stateModifiers: StateModifiers = {
    closeUsernav: () => {},
    openCart: () => {},
    openWishList: () => {},
    openViewedProducts: () => {},
};

const UIContext = createContext<State>({
    ...initialState,
    ...stateModifiers,
});

type Action = {
    type:
        | "CLOSE_USERNAV"
        | "OPEN_CART"
        | "OPEN_WISHLIST"
        | "OPEN_VIEWED_PRODUCTS";
};

function uiReducer(state: StateValues, action: Action) {
    switch (action.type) {
        case "CLOSE_USERNAV":
            return {
                ...state,
                isUsernavOpen: false,
                isCartOpen: false,
                isWishListOpen: false,
                isViewedProductsOpen: false,
            };

        case "OPEN_CART":
            return {
                ...state,
                isUsernavOpen: true,
                isCartOpen: true,
                isWishListOpen: false,
                isViewedProductsOpen: false,
            };

        case "OPEN_WISHLIST":
            return {
                ...state,
                isUsernavOpen: true,
                isWishListOpen: true,
                isCartOpen: false,
                isViewedProductsOpen: false,
            };

        case "OPEN_VIEWED_PRODUCTS":
            return {
                ...state,
                isUsernavOpen: true,
                isViewedProductsOpen: true,
                isCartOpen: false,
                isWishListOpen: false,
            };

        default:
            return { ...state };
    }
}

const UIProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, initialState);

    const closeUsernav = () => dispatch({ type: "CLOSE_USERNAV" });
    const openCart = () => dispatch({ type: "OPEN_CART" });
    const openWishList = () => dispatch({ type: "OPEN_WISHLIST" });
    const openViewedProducts = () => dispatch({ type: "OPEN_VIEWED_PRODUCTS" });

    const value = useMemo(() => {
        return {
            ...state,
            closeUsernav,
            openCart,
            openWishList,
            openViewedProducts,
        };
    }, [state]);

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
    const context = useContext(UIContext);
    return context;
};

export default UIProvider;
