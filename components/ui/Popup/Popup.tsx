import { FC, MutableRefObject, ReactNode, useRef } from "react";

import { useBodyScroll, useMediaQueryNext } from "@hooks";

import { useProductInfo } from "@components/product/context";
import { useUI } from "../context";

import { Container, Overlay, Root } from "./Popup.styled";

interface Props {
    children: ReactNode | ReactNode[];
}

const Popup: FC<Props> = ({ children }) => {
    const { isProductCartOpen, isProductAdded, closePopup } = useUI();

    const {
        isDimensionsOpen,
        isFeaturesOpen,
        isMaterialsOpen,
        isShippingOpen,
        isSustainability,
        closeProductInformation,
    } = useProductInfo();

    const isProductInfo =
        isDimensionsOpen ||
        isFeaturesOpen ||
        isMaterialsOpen ||
        isShippingOpen ||
        isSustainability;

    const isOverlay = isProductInfo || isProductCartOpen || isProductAdded;

    const ref = useRef() as MutableRefObject<HTMLDivElement>;
    const isScreenLarge = useMediaQueryNext("lg");
    useBodyScroll(ref, isProductCartOpen, isScreenLarge);

    function handleOverlay() {
        if (!isProductInfo) closePopup();
        closeProductInformation();
    }

    return (
        <Root ref={ref} data-testid="product-popup">
            <>
                {isOverlay && <Overlay onClick={() => handleOverlay()} />}
                <Container>{children}</Container>
            </>
        </Root>
    );
};

export default Popup;
