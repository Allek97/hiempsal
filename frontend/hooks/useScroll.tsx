// BUG Expected server HTML to contain a matching <div> in <div>
// FIX https://dev.to/adrien/creating-a-custom-react-hook-to-get-the-window-s-dimensions-in-next-js-135k

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
    }, [scrollY]);

    return isScrolled;
};

export default useScroll;
