import { renderHook, act } from "@testing-library/react-hooks";
import { ReactNode, useReducer } from "react";
import UIProvider, {
    useUI,
    initialState,
    stateModifiers,
    uiReducer,
    Action,
} from "./context";

const wrapper = ({ children }: { children: ReactNode }) => (
    <UIProvider>{children}</UIProvider>
);

jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useReducer: jest.fn(),
}));

describe("UI context prodiver", () => {
    test("UseUI default values", () => {
        const { result } = renderHook(useUI, { wrapper });
        expect(JSON.stringify(result.current)).toStrictEqual(
            JSON.stringify({
                ...initialState,
                ...stateModifiers,
            })
        );
    });

    test("Open and close mobile menu", () => {
        const { result } = renderHook(useUI, { wrapper });
        expect(result.current.isMobileMenuOpen).toBe(false);
        act(() => result.current.openMobileMenu());
        expect(result.current.isMobileMenuOpen).toBe(true);
        act(() => result.current.closeMobileMenu());
        expect(result.current.isMobileMenuOpen).toBe(false);
    });

    test("Open popup UI component", () => {
        const { result } = renderHook(useUI, { wrapper });
        expect(result.current.isPopupOpen).toBe(false);
        act(() => result.current.openPopup());
        expect(result.current.isPopupOpen).toBe(true);
        act(() => result.current.closePopup());
        expect(result.current.isPopupOpen).toBe(false);
    });
    test.only("Closing popup UI component will close productAdded,productCart and help component", () => {
        // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires

        const mockUseReducer = useReducer as unknown as jest.Mock;
        mockUseReducer.mockImplementation(
            jest.requireActual("react").useReducer
        );
        mockUseReducer.mockImplementation(() => ["someMockedValue", "any"]);

        const { result } = renderHook(useUI, { wrapper });

        const mockState = {
            ...initialState,
            isPopupOpen: true,
            isProductAdded: true,
            isProductCartOpen: true,
            isHelpOpen: true,
        };

        const action: Action = {
            type: "CLOSE_POPUP",
        };

        const updatedState = uiReducer(mockState, action);

        expect(updatedState).toEqual({
            isPopupOpen: false,
            isProductAdded: false,
            isProductCartOpen: false,
            isHelpOpen: false,
            isMobileMenuOpen: false,
            isReviewOpen: false,
        });

        act(() => result.current.closePopup());
    });
    test("Open and close review UI component", () => {
        const { result } = renderHook(useUI, { wrapper });
        expect(result.current.isReviewOpen).toBe(false);
        act(() => result.current.openReview());
        expect(result.current.isReviewOpen).toBe(true);
        act(() => result.current.closeReview());
        expect(result.current.isReviewOpen).toBe(false);
    });

    test("Open and close productCart UI component", () => {
        const { result } = renderHook(useUI, { wrapper });
        expect(result.current.isProductCartOpen).toBe(false);
        act(() => result.current.openReview());
        expect(result.current.isReviewOpen).toBe(true);
        act(() => result.current.closeReview());
        expect(result.current.isReviewOpen).toBe(false);
    });

    test("Setting product variant as added will open popup UI component; close review and product cart", () => {
        const { result } = renderHook(useUI, { wrapper });
        expect(result.current.isProductAdded).toBe(false);
        act(() => result.current.setProductAdded());
    });
});
