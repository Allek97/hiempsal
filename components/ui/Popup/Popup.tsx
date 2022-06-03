import { FC, MutableRefObject, ReactNode, useRef } from "react";

import { useBodyScroll, useMediaQueryNext } from "@hooks";

import { useProduct } from "@components/product/context";
import { useUI } from "../context";

import { Container, Overlay, Root } from "./Popup.styled";

interface Props {
    children: ReactNode | ReactNode[];
}

const Popup: FC<Props> = ({ children }) => {
    const {
        isProductCartOpen,
        isProductAdded,
        isHelpOpen,
        isReviewOpen,
        closePopup,
        closeHelp,
        closeReview,
    } = useUI();

    const { isProductInfoOpen, closeProductInformation } = useProduct();

    const isOverlay =
        isProductInfoOpen ||
        isProductCartOpen ||
        isProductAdded ||
        isReviewOpen ||
        isHelpOpen;

    const ref = useRef() as MutableRefObject<HTMLDivElement>;
    const isScreenLarge = useMediaQueryNext("lg");
    useBodyScroll(ref, isProductCartOpen, isScreenLarge);

    function handleOverlay() {
        if (!isProductInfoOpen && !isHelpOpen && !isReviewOpen) closePopup();
        closeProductInformation();
        closeHelp();
        closeReview();
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
