/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, FC, useContext, useMemo, useReducer } from "react";

interface StateValues {
    isUsernavOpen: boolean;
    isCartOpen: boolean;
    isWishListOpen: boolean;
    isViewedProductsOpen: boolean;
    isUsernavScrolled: boolean;
}

interface StateModifiers {
    closeUsernav: () => void;
    openCart: () => void;
    openWishList: () => void;
    openViewedProducts: () => void;
    // eslint-disable-next-line no-unused-vars
    setUsernavScrollStatus: (scrollTop: number) => void;
}

type State = StateValues & StateModifiers;

const initialState: StateValues = {
    isUsernavOpen: false,
    isUsernavScrolled: false,
    isCartOpen: false,
    isWishListOpen: false,
    isViewedProductsOpen: false,
};

const stateModifiers: StateModifiers = {
    closeUsernav: () => {},
    openCart: () => {},
    openWishList: () => {},
    openViewedProducts: () => {},
    setUsernavScrollStatus: (scrollTop: number) => {
        console.log(scrollTop);
    },
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
        | "OPEN_VIEWED_PRODUCTS"
        | "SET_USERNAV_SCROLL_STATUS";
    payload?: any;
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

        case "SET_USERNAV_SCROLL_STATUS":
            if (action.payload >= 20)
                return { ...state, isUsernavScrolled: true };
            return { ...state, isUsernavScrolled: false };

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
    const setUsernavScrollStatus = (scrollTop: number) =>
        dispatch({ type: "SET_USERNAV_SCROLL_STATUS", payload: scrollTop });

    const value = useMemo(() => {
        return {
            ...state,
            closeUsernav,
            openCart,
            openWishList,
            openViewedProducts,
            setUsernavScrollStatus,
        };
    }, [state]);

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
    const context = useContext(UIContext);
    return context;
};

export default UIProvider;
