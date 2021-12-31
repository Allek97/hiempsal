import { useMediaQuery } from "react-responsive";
import tailwindConfig from "../../tailwind.config";

type Screen = "sm" | "md" | "lg" | "xl" | "2xl";

const useMediaQueryNext = (screenSize: Screen | number): boolean => {
    const twScreens: (string | number)[] = ["sm", "md", "lg", "xl", "2xl"];

    const { screens } = tailwindConfig.theme.extend;

    const query = twScreens.includes(screenSize)
        ? screens[`${screenSize as Screen}`]
        : `${screenSize}em`;

    return useMediaQuery({
        query: `(min-width: ${query})`,
    });
};

export default useMediaQueryNext;
