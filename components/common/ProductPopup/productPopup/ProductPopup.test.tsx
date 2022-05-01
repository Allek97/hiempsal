import { State, UIContext } from "@components/ui/context";
import useAddItem from "@framework/cart/use-add-item";
import { act, render, screen } from "@testing-library/react";

import { product as productMock } from "../__mocks__/variables";
import ProductPopup, { Props as ProductPopupProps } from "./ProductPopup";

jest.mock("framer-motion", () => ({
    ...jest.requireActual("framer-motion"),
    useReducedMotion: () => true,
}));

const defaultProps: ProductPopupProps = {
    product: productMock,
};

type Render = {
    uiProviderProps: Partial<State>;
    props?: Partial<ProductPopupProps>;
};

function renderProductPopup({ uiProviderProps, ...props }: Render) {
    return {
        ...render(
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            <UIContext.Provider value={uiProviderProps as State}>
                <ProductPopup {...defaultProps} {...props} />
            </UIContext.Provider>
        ),
    };
}

jest.mock("@framework/cart/use-add-item");

describe("component renders correctly", () => {
    it("when is <ProductCart/> is open", async () => {
        const mockUseAddItem = useAddItem as unknown as jest.Mock;
        mockUseAddItem.mockImplementation(() => {});

        await act(async () => mockUseAddItem());

        const { debug } = await renderProductPopup({
            uiProviderProps: { isProductCartOpen: true, isProductAdded: false },
        });

        debug();
    });

    it("when is <ProductSelected /> is open", () => {
        const { debug } = renderProductPopup({
            uiProviderProps: { isProductCartOpen: false, isProductAdded: true },
        });

        debug();
    });
});
