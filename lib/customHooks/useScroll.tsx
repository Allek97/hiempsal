// NOTE Add effects after you scroll window a certain scrollY
// BUG https://dev.to/adrien/creating-a-custom-react-hook-to-get-the-window-s-dimensions-in-next-js-135k

import { useState, useEffect } from "react";

const useScroll = (scrollY: number): boolean => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const listenScrollEvent = (): void => {
            if (window.scrollY > scrollY) {
                setIsScrolled(true);
            } else setIsScrolled(false);
        };

        listenScrollEvent();

        window.addEventListener("scroll", listenScrollEvent);

        return (): void => {
            window.removeEventListener("scroll", listenScrollEvent);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // NOTE Empty array ensures that effect is only run on mount

    return isScrolled;
};

export default useScroll;
