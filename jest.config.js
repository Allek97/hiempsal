module.exports = {
    rootDir: ".",
    collectCoverageFrom: [
        "**/*.{js,jsx,ts,tsx}",
        "!**/__tests__/**",
        "!**/*.d.ts",
        "!**/node_modules/**",
    ],
    displayName: "client",
    moduleNameMapper: {
        // Handle CSS imports (with CSS modules)
        // https://jestjs.io/docs/webpack#mocking-css-modules
        "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

        // Handle CSS imports (without CSS modules)
        "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",

        // Handle image imports
        // https://jestjs.io/docs/webpack#handling-static-assets
        "^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i": `<rootDir>/__mocks__/fileMock.js`,

        // Handle module aliases
        "^@components/(.*)$": "<rootDir>/components/$1",
        "^@framework/(.*)$": "<rootDir>/framework/shopify/$1",
        "^@styles/(.*)$": "<rootDir>/styles/$1",
        "^@assets/(.*)$": "<rootDir>/assets/$1",
        "^@lib/(.*)$": "<rootDir>/lib/$1",
        "^@contexts/(.*)$": "<rootDir>/contexts/$1",
        "^@tests/(.*)$": "<rootDir>/tests/$1",
        "^@hooks/(.*)$": "<rootDir>/hooks/$1",
        "^@hooks(.*)$": "<rootDir>/hooks",
    },
    // Add more setup options before each test is run
    setupFilesAfterEnv: ["<rootDir>/tests/setup-env.ts"],
    testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
    testEnvironment: "jsdom",
    transform: {
        // Use babel-jest to transpile tests with the next/babel preset
        // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
        "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
    },
    transformIgnorePatterns: [
        "/node_modules/",
        "^.+\\.module\\.(css|sass|scss)$",
    ],
    watchPlugins: [
        "jest-watch-typeahead/filename",
        "jest-watch-typeahead/testname",
        "jest-watch-select-projects",
    ],
    snapshotSerializers: ["@emotion/jest/serializer"],
};
