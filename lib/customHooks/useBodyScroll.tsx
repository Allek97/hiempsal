// NOTE Disable body component when opening a component

import {
    clearAllBodyScrollLocks,
    disableBodyScroll,
    enableBodyScroll,
} from "body-scroll-lock";
import { MutableRefObject, useEffect } from "react";

const useBodyScroll = (ref: MutableRefObject<HTMLElement>, isOpen: boolean) => {
    useEffect(() => {
        if (ref.current) {
            if (isOpen) disableBodyScroll(ref.current);
            else enableBodyScroll(ref.current);
        }
        return () => {
            clearAllBodyScrollLocks();
        };
    }, [isOpen, ref]);
};

export default useBodyScroll;
