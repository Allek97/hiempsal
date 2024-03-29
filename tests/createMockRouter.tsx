import { NextRouter } from "next/router";

// NOTE : https://stackoverflow.com/questions/66322816/mock-next-link-with-jest-in-next-js
const createMockRouter = (router: Partial<NextRouter>): NextRouter => {
    return {
        basePath: "",
        pathname: "/",
        route: "/",
        query: {},
        asPath: "/",
        back: jest.fn(),
        beforePopState: jest.fn(),
        prefetch: jest.fn(() => Promise.resolve()),
        push: jest.fn().mockResolvedValue(true),
        reload: jest.fn(),
        replace: jest.fn(),
        events: {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        },
        isFallback: false,
        isLocaleDomain: false,
        isReady: true,
        defaultLocale: "en",
        domainLocales: [],
        isPreview: false,
        ...router,
    };
};
export default createMockRouter;
