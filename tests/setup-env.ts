import "@testing-library/jest-dom/extend-expect";
import "jest-axe/extend-expect";

export const mockFramerMotion = () =>
    jest.mock("framer-motion", () => ({
        ...jest.requireActual("framer-motion"),
        useReducedMotion: () => true,
    }));
