import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import tailwindConfig from "../tailwind.config";

type Screen = "sm" | "md" | "lg" | "xl" | "2xl";

const useMediaQueryNext = (screenSize: Screen | number): boolean => {
    // NOTE Add an event that listens to window width change,
    // rerender every time it hits one the custom mediaQueries
    const [__, setScreenWidth] = useState(0);
    const mediaRerender: number[] = [
        480, 640, 768, 1024, 1125, 1280, 1500, 1680, 1800, 1920,
    ];
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

    // NOTE We are making sure there is a re-render every time window.innerWidth hits one of our queries
    // useLayoutEffect more appropriate cause we are measuring DOM even though useEffect will work just fine
    useEffect(() => {
        function updateSize() {
            if (mediaRerender.includes(window.innerWidth))
                setScreenWidth(window.innerWidth);
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return useMediaQuery({
        query: `(min-width: ${query})`,
    });
};

export default useMediaQueryNext;
