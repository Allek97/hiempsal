// NOTE: Permet de detecter l'element dans le viewport avec un threshold (nb d'unites avant/apres detecter l'element)

import { useState, useEffect, MutableRefObject } from "react";

const useScreenIntersection = (
    ref: MutableRefObject<HTMLElement>,
    threshold: number,
    adjustHeight = false,
    bounceDelay = 20
) => {
    const [animateAppSection, setAnimateAppSection] = useState<boolean>(false);

    function handleScroll() {
        if (ref.current) {
            const topPosition = ref.current.getBoundingClientRect().top;
            let cutOff;
            if (adjustHeight) {
                const elementHeight = ref.current.clientHeight;
                cutOff = window.innerHeight + elementHeight + threshold;
            } else {
                cutOff = window.innerHeight + threshold;
            }

            if (topPosition < cutOff) {
                setAnimateAppSection(true);
            }
        }
    }

    function debounce(method: any, delay: number) {
        clearTimeout(method._tId);
        method._tId = setTimeout(function () {
            method();
        }, delay);
    }

    useEffect(() => {
        window.addEventListener("scroll", () =>
            debounce(handleScroll, bounceDelay)
        );
        return () =>
            window.removeEventListener("scroll", () =>
                debounce(handleScroll, bounceDelay)
            );
    }, []);

    return animateAppSection;
};

export default useScreenIntersection;
