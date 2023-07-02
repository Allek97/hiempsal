import { useRouter } from "next/router";
import { useEffect } from "react";

const useScollToTop = () => {
    const { pathname } = useRouter();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
};

export default useScollToTop;
