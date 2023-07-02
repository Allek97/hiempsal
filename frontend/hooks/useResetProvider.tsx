import { useProduct } from "@components/product/context";
import { useUI } from "@components/ui/context";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useResetProvider = (): void => {
    const { pathname } = useRouter();
    const { resetUI } = useUI();
    const { resetProductInfo } = useProduct();
    useEffect(() => {
        if (!pathname.includes("/products/")) {
            resetUI();
            resetProductInfo();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);
};

export default useResetProvider;
