module.exports = {
    __esModule: true,
    default: () => {
        jest.mock("framer-motion", () => ({
            ...jest.requireActual("framer-motion"),
            useReducedMotion: () => true,
        }));
    },
};
