// NOTE: Returns the direction of the scroll (scrolling UP or scrolling DOWN)
import { useEffect, useState } from "react";
import { useScrollDirection } from "react-use-scroll-direction";

type Direction = "up" | "down" | "neutral";

const useScrollDirectionNext = (): { direction: Direction } => {
    const [direction, setDirection] = useState<Direction>("neutral");
    const { isScrollingUp, isScrollingDown } = useScrollDirection();

    useEffect(() => {
        if (isScrollingDown) setDirection("down");
        if (isScrollingUp) setDirection("up");
    }, [isScrollingDown, isScrollingUp]);

    return { direction };
};

export default useScrollDirectionNext;
