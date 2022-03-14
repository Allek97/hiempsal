// NOTE Disable body component when opening a component

import {
    clearAllBodyScrollLocks,
    disableBodyScroll,
    enableBodyScroll,
} from "body-scroll-lock";
import { MutableRefObject, useEffect } from "react";

const useBodyScroll = (
    ref: MutableRefObject<HTMLElement>,
    condition1: boolean,
    condition2?: boolean
) => {
    useEffect(() => {
        if (ref.current) {
            if (condition1 && (condition2 ?? true))
                disableBodyScroll(ref.current);
            else enableBodyScroll(ref.current);
        }
        return () => {
            clearAllBodyScrollLocks();
        };
    }, [condition1, condition2, ref]);
};

export default useBodyScroll;
