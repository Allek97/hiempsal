import { useEffect } from "react";

const useBodyScroll = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
};

export default useBodyScroll;
