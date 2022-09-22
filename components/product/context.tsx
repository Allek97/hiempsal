import { createContext, FC, useContext, useMemo, useReducer } from "react";

type ProductType = "clothing" | "technology";

interface StateValues {
    isFeaturesOpen: boolean;
    isMaterialsOpen: boolean;
    isSustainability: boolean;
    isDimensionsOpen: boolean;
    isShippingOpen: boolean;
    isProductOverviewOpen: boolean;
    isProductInfoOpen: boolean;
    productId: string;
    productType: ProductType;
}

interface StateModifiers {
    openFeatures: () => void;
    openMaterials: () => void;
    openSustainability: () => void;
    openDimensions: () => void;
    openShipping: () => void;
    closeProductInformation: () => void;
    setProductOverview: (condition: boolean) => void;
    setProductId: (id: string) => void;
    setProductType: (type: ProductType) => void;
    resetProductInfo: () => void;
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
    productId: "",
    productType: "clothing",
};

const stateModifiers: StateModifiers = {
    openFeatures: () => {},
    openMaterials: () => {},
    openSustainability: () => {},
    openDimensions: () => {},
    openShipping: () => {},
    closeProductInformation: () => {},
    setProductOverview: () => {},
    setProductId: () => {},
    setProductType: () => {},
    resetProductInfo: () => {},
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
        | "SET_PRODUCT_OVERVIEW"
        | "SET_PRODUCT_ID"
        | "SET_PRODUCT_TYPE"
        | "RESET";
    payload?: boolean | string | any;
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
            if (action.payload as boolean)
                return {
                    ...state,
                    isProductOverviewOpen: true,
                };

            return {
                ...state,
                isProductOverviewOpen: false,
            };
        case "SET_PRODUCT_ID":
            if (action.payload as string)
                return {
                    ...state,
                    productId: action.payload,
                };

            return {
                ...state,
            };
        case "SET_PRODUCT_TYPE":
            if (action.payload as ProductType)
                return {
                    ...state,
                    productType: action.payload,
                };

            return {
                ...state,
            };
        case "RESET":
            return {
                ...initialState,
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
    const setProductId = (id: string) =>
        dispatch({ type: "SET_PRODUCT_ID", payload: id });
    const setProductType = (type: ProductType) =>
        dispatch({ type: "SET_PRODUCT_TYPE", payload: type });
    const resetProductInfo = () => dispatch({ type: "RESET" });

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
            setProductId,
            setProductType,
            resetProductInfo,
        }),
        [state, isProductInfoOpen]
    );

    return <PIContext.Provider value={value}>{children}</PIContext.Provider>;
};

export const useProduct = (): State => {
    const context = useContext(PIContext);
    return context;
};

export default ProductInfoProvider;
