import { FC, MutableRefObject, ReactNode, useRef } from "react";

import { useBodyScroll, useMediaQueryNext } from "lib/customHooks";

import { useUI } from "../context";

import { Overlay, Root } from "./Popup.styled";
import { PopupContainer } from ".";

interface Props {
    children: ReactNode | ReactNode[];
}

const ProductPopup: FC<Props> = ({ children }) => {
    const { isProductPopupOpen, closeProductPopup, setProductNotAdded } =
        useUI();

    const ref = useRef() as MutableRefObject<HTMLDivElement>;

    const isScreenLarge = useMediaQueryNext("lg");

    useBodyScroll(ref, isProductPopupOpen, !isScreenLarge);

    return (
        <Root ref={ref}>
            {isProductPopupOpen && (
                <>
                    <Overlay
                        onClick={() => {
                            setProductNotAdded();
                            closeProductPopup();
                        }}
                    />
                    <PopupContainer>{children}</PopupContainer>
                </>
            )}
        </Root>
    );
};

export default ProductPopup;
