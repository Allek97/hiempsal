/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, FC, useContext, useMemo, useReducer } from "react";

interface StateValues {
    isSidebarOpen: boolean;
}

interface StateModifiers {
    openSidebar: () => void;
    closeSidebar: () => void;
}

type State = StateValues & StateModifiers;

const initialState: StateValues = { isSidebarOpen: false };

const stateModifiers: StateModifiers = {
    openSidebar: () => {},
    closeSidebar: () => {},
};

const UIContext = createContext<State>({
    ...initialState,
    ...stateModifiers,
});

type Action = { type: "OPEN_SIDEBAR" | "CLOSE_SIDEBAR" };

function uiReducer(state: StateValues, action: Action) {
    switch (action.type) {
        case "OPEN_SIDEBAR":
            return { ...state, isSidebarOpen: true };

        case "CLOSE_SIDEBAR":
            return { ...state, isSidebarOpen: false };

        default:
            return { ...state };
    }
}

const UIProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, initialState);

    console.log(state);

    const openSidebar = () => dispatch({ type: "OPEN_SIDEBAR" });
    const closeSidebar = () => dispatch({ type: "CLOSE_SIDEBAR" });

    const value = useMemo(() => {
        return {
            ...state,
            openSidebar,
            closeSidebar,
        };
    }, [state]);

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
    const context = useContext(UIContext);
    return context;
};

export default UIProvider;
