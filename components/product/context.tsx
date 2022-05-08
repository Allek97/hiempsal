import { createContext, FC, useContext, useMemo, useReducer } from "react";

interface StateValues {
    isFeaturesOpen: boolean;
    isMaterialsOpen: boolean;
    isSustainability: boolean;
    isDimensionsOpen: boolean;
    isShippingOpen: boolean;
}

interface StateModifiers {
    openFeatures: () => void;
    openMaterials: () => void;
    openSustainability: () => void;
    openDimensions: () => void;
    openShipping: () => void;
    closeProductInformation: () => void;
}

export type State = StateValues & StateModifiers;

const initialState: StateValues = {
    isFeaturesOpen: false,
    isMaterialsOpen: false,
    isSustainability: false,
    isDimensionsOpen: false,
    isShippingOpen: false,
};

const stateModifiers: StateModifiers = {
    openFeatures: () => {},
    openMaterials: () => {},
    openSustainability: () => {},
    openDimensions: () => {},
    openShipping: () => {},
    closeProductInformation: () => {},
};

const PIContext = createContext<State>({ ...initialState, ...stateModifiers });

type Action =
    | "OPEN_FEATURES"
    | "OPEN_MATERIALS"
    | "OPEN_SUSTAINABILITY"
    | "OPEN_DIMENSIONS"
    | "OPEN_SHIPPING"
    | "CLOSE_PRODUCT_INFORMATION";

function piReducer(state: StateValues, action: Action) {
    switch (action) {
        case "OPEN_FEATURES":
            return {
                ...state,
                isFeaturesOpen: true,
                isMaterialsOpen: false,
                isSustainability: false,
                isDimensionsOpen: false,
                isShippingOpen: false,
            };
        case "OPEN_MATERIALS":
            return {
                ...state,
                isFeaturesOpen: false,
                isMaterialsOpen: true,
                isSustainability: false,
                isDimensionsOpen: false,
                isShippingOpen: false,
            };
        case "OPEN_SUSTAINABILITY":
            return {
                ...state,
                isFeaturesOpen: false,
                isMaterialsOpen: false,
                isSustainability: true,
                isDimensionsOpen: false,
                isShippingOpen: false,
            };
        case "OPEN_DIMENSIONS":
            return {
                ...state,
                isFeaturesOpen: false,
                isMaterialsOpen: false,
                isSustainability: false,
                isDimensionsOpen: true,
                isShippingOpen: false,
            };
        case "OPEN_SHIPPING":
            return {
                ...state,
                isFeaturesOpen: false,
                isMaterialsOpen: false,
                isSustainability: false,
                isDimensionsOpen: false,
                isShippingOpen: true,
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

        default:
            return {
                ...state,
            };
    }
}

const ProductInfoProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(piReducer, initialState);

    const openFeatures = () => dispatch("OPEN_FEATURES");
    const openMaterials = () => dispatch("OPEN_MATERIALS");
    const openSustainability = () => dispatch("OPEN_SUSTAINABILITY");
    const openDimensions = () => dispatch("OPEN_DIMENSIONS");
    const openShipping = () => dispatch("OPEN_SHIPPING");
    const closeProductInformation = () => dispatch("CLOSE_PRODUCT_INFORMATION");

    const value: State = useMemo(
        () => ({
            ...state,
            openFeatures,
            openMaterials,
            openSustainability,
            openDimensions,
            openShipping,
            closeProductInformation,
        }),
        [state]
    );

    return <PIContext.Provider value={value}>{children}</PIContext.Provider>;
};

export const useProductInfo = (): State => {
    const context = useContext(PIContext);
    return context;
};

export default ProductInfoProvider;
