import { createContext, ReactNode, useContext, useMemo } from "react";
import { getConfig } from "./api/config";
import { shopifyHooks } from "./hooks";
import { ApiProviderContext } from "./types/api";

interface ShopifyApiProviderProps {
    children: ReactNode | ReactNode[];
}
const config = getConfig();

export const ShopifyApiContext = createContext<Partial<ApiProviderContext>>({});
export const ApiProvider = ({ children }: ShopifyApiProviderProps) => {
    const value = useMemo(() => {
        return {
            fetcher: config.fetch,
            hooks: shopifyHooks,
            checkoutCookie: config.checkoutCookie,
        };
    }, []);
    return (
        <ShopifyApiContext.Provider value={value}>
            {children}
        </ShopifyApiContext.Provider>
    );
};

export const useApiProvider = () => {
    return useContext(ShopifyApiContext) as ApiProviderContext;
};
