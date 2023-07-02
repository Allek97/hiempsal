import { ProductPrice } from "@framework/types/product";
import getSymbolFromCurrency from "currency-symbol-map";
import { useMemo } from "react";

export const useCurrency = (productPrice: ProductPrice) => {
    const currency: string = useMemo(
        () =>
            productPrice.currencyCode === "CAD"
                ? "C" + getSymbolFromCurrency(productPrice.currencyCode)
                : productPrice.currencyCode +
                  getSymbolFromCurrency(productPrice.currencyCode),
        [productPrice.currencyCode]
    );

    return currency;
};
