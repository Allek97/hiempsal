import * as nextRouter from "next/router";
import { NextRouter } from "next/router";
import { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";

import UIProvider from "@components/ui/context";
import ThemeUIProvider from "@components/ui/themeContext";
import HistoryProvider from "@contexts/History";
import { MediaContextProvider } from "@lib/media";
import createMockRouter from "./createMockRouter";

jest.mock("framer-motion", () => ({
    ...jest.requireActual("framer-motion"),
    useReducedMotion: () => true,
}));

jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "",
            pathname: "",
            query: "",
            asPath: "",
        };
    },
}));

// NOTE : allows me to run mockImplementation in relevent tests and add
// my custom useRouter attributes
const useRouter = jest.spyOn(nextRouter, "useRouter");

const AllTheProviders: FC = ({ children }) => {
    return (
        <UIProvider>
            <ThemeUIProvider>
                <HistoryProvider>
                    <MediaContextProvider>{children}</MediaContextProvider>
                </HistoryProvider>
            </ThemeUIProvider>
        </UIProvider>
    );
};

type CustomOptions = {
    renderOptions?: Omit<RenderOptions, "wrapper">;
    routerOptions?: Partial<NextRouter>;
};

const customRender = (
    ui: ReactElement,
    { renderOptions, routerOptions = {} }: CustomOptions = {}
) => ({
    ...render(
        <RouterContext.Provider value={createMockRouter(routerOptions)}>
            {ui}
        </RouterContext.Provider>,
        { wrapper: AllTheProviders, ...renderOptions }
    ),
    mockRouter: createMockRouter(routerOptions),
});

export * from "@testing-library/react";
export { customRender as render, useRouter as mockUseRouter };
