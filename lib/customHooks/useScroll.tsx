// NOTE:  Add effects after you scroll window a certain scrollY

import { useState, useEffect } from "react";

const useScroll = (scrollY: number, bounceTime: number) => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    function debounce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        method: { (): void; (): void; (): void; _tId?: any },
        delay: number
    ) {
        clearTimeout(method._tId);
        method._tId = setTimeout(() => method(), delay);
    }

    useEffect(() => {
        const listenScrollEvent = () => {
            if (window.scrollY > scrollY) {
                return setIsScrolled(true);
            }
            return setIsScrolled(false);
        };

        window.addEventListener("scroll", () =>
            debounce(listenScrollEvent, bounceTime)
        );

        return () => {
            window.removeEventListener("scroll", () =>
                debounce(listenScrollEvent, bounceTime)
            );
        };
    }, [bounceTime, scrollY]);

    return isScrolled;
};

export default useScroll;
