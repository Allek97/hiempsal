import { useMediaQuery } from "react-responsive";
import tailwindConfig from "../../tailwind.config";

type Screen = "sm" | "md" | "lg" | "xl" | "2xl";

const useMediaQueryNext = (screenSize: Screen | number): boolean => {
    const twScreens: (string | number)[] = [
        "xs",
        "sm",
        "md",
        "lg",
        "2lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
    ];

    const { screens } = tailwindConfig.theme.extend;

    const query = twScreens.includes(screenSize)
        ? screens[`${screenSize as Screen}`]
        : `${screenSize}em`;

    return useMediaQuery({
        query: `(min-width: ${query})`,
    });
};

export default useMediaQueryNext;
