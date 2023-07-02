// BUG Expected server HTML to contain a matching <div> in <div>
// FIX https://dev.to/adrien/creating-a-custom-react-hook-to-get-the-window-s-dimensions-in-next-js-135k

import { useState, useEffect } from "react";

const useTouchDevice = (): boolean => {
    const [isTouch, setIsTouch] = useState<boolean>(true);

    useEffect(() => {
        setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // NOTE Empty array ensures that effect is only run on mount

    return isTouch;
};

export default useTouchDevice;
