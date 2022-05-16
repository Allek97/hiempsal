import { createContext, FC, useContext, useMemo, useReducer } from "react";

interface StateValues {
    isFeaturesOpen: boolean;
    isMaterialsOpen: boolean;
    isSustainability: boolean;
    isDimensionsOpen: boolean;
    isShippingOpen: boolean;
    isProductOverviewOpen: boolean;
    isProductInfoOpen: boolean;
}

interface StateModifiers {
    openFeatures: () => void;
    openMaterials: () => void;
    openSustainability: () => void;
    openDimensions: () => void;
    openShipping: () => void;
    closeProductInformation: () => void;
    setProductOverview: (condition: boolean) => void;
}

export type State = StateValues & StateModifiers;

const initialState: StateValues = {
    isFeaturesOpen: false,
    isMaterialsOpen: false,
    isSustainability: false,
    isDimensionsOpen: false,
    isShippingOpen: false,
    isProductInfoOpen: false,
    isProductOverviewOpen: false,
};

const stateModifiers: StateModifiers = {
    openFeatures: () => {},
    openMaterials: () => {},
    openSustainability: () => {},
    openDimensions: () => {},
    openShipping: () => {},
    closeProductInformation: () => {},
    setProductOverview: () => {},
};

const PIContext = createContext<State>({ ...initialState, ...stateModifiers });

type Action = {
    type:
        | "OPEN_FEATURES"
        | "OPEN_MATERIALS"
        | "OPEN_SUSTAINABILITY"
        | "OPEN_DIMENSIONS"
        | "OPEN_SHIPPING"
        | "CLOSE_PRODUCT_INFORMATION"
        | "SET_PRODUCT_OVERVIEW";
    payload?: boolean;
};

function piReducer(state: StateValues, action: Action) {
    switch (action.type) {
        case "OPEN_FEATURES":
            return {
                ...state,
                isFeaturesOpen: true,
                isProductOverviewOpen: true,
                isMaterialsOpen: false,
                isSustainability: false,
                isDimensionsOpen: false,
                isShippingOpen: false,
            };
        case "OPEN_MATERIALS":
            return {
                ...state,
                isMaterialsOpen: true,
                isProductOverviewOpen: true,
                isFeaturesOpen: false,
                isSustainability: false,
                isDimensionsOpen: false,
                isShippingOpen: false,
            };
        case "OPEN_SUSTAINABILITY":
            return {
                ...state,
                isSustainability: true,
                isProductOverviewOpen: true,
                isFeaturesOpen: false,
                isMaterialsOpen: false,
                isDimensionsOpen: false,
                isShippingOpen: false,
            };
        case "OPEN_DIMENSIONS":
            return {
                ...state,
                isDimensionsOpen: true,
                isProductOverviewOpen: true,
                isFeaturesOpen: false,
                isMaterialsOpen: false,
                isSustainability: false,
                isShippingOpen: false,
            };
        case "OPEN_SHIPPING":
            return {
                ...state,
                isShippingOpen: true,
                isProductOverviewOpen: true,
                isFeaturesOpen: false,
                isMaterialsOpen: false,
                isSustainability: false,
                isDimensionsOpen: false,
            };
        case "CLOSE_PRODUCT_INFORMATION":
            return {
                ...state,
                isFeaturesOpen: false,
                isMaterialsOpen: false,
                isSustainability: false,
                isDimensionsOpen: false,
                isShippingOpen: false,
            };
        case "SET_PRODUCT_OVERVIEW":
            if (action.payload)
                return {
                    ...state,
                    isProductOverviewOpen: true,
                };

            return {
                ...state,
                isProductOverviewOpen: false,
            };
        default:
            return {
                ...state,
            };
    }
}

const ProductInfoProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(piReducer, initialState);

    const openFeatures = () => dispatch({ type: "OPEN_FEATURES" });
    const openMaterials = () => dispatch({ type: "OPEN_MATERIALS" });
    const openSustainability = () => dispatch({ type: "OPEN_SUSTAINABILITY" });
    const openDimensions = () => dispatch({ type: "OPEN_DIMENSIONS" });
    const openShipping = () => dispatch({ type: "OPEN_SHIPPING" });
    const closeProductInformation = () =>
        dispatch({ type: "CLOSE_PRODUCT_INFORMATION" });
    const setProductOverview = (condition: boolean) =>
        dispatch({ type: "SET_PRODUCT_OVERVIEW", payload: condition });

    const {
        isDimensionsOpen,
        isFeaturesOpen,
        isMaterialsOpen,
        isShippingOpen,
        isSustainability,
    } = state;

    const isProductInfoOpen = useMemo(
        () =>
            isDimensionsOpen ||
            isFeaturesOpen ||
            isMaterialsOpen ||
            isShippingOpen ||
            isSustainability,
        [
            isDimensionsOpen,
            isFeaturesOpen,
            isMaterialsOpen,
            isShippingOpen,
            isSustainability,
        ]
    );

    const value: State = useMemo(
        () => ({
            ...state,
            isProductInfoOpen,
            openFeatures,
            openMaterials,
            openSustainability,
            openDimensions,
            openShipping,
            closeProductInformation,
            setProductOverview,
        }),
        [state, isProductInfoOpen]
    );

    return <PIContext.Provider value={value}>{children}</PIContext.Provider>;
};

export const useProductInfo = (): State => {
    const context = useContext(PIContext);
    return context;
};

export default ProductInfoProvider;
