import { FC, MutableRefObject, ReactNode, useRef } from "react";

import { useBodyScroll, useMediaQueryNext } from "lib/customHooks";

import Close from "@components/icons/Close";

import { useUI } from "../context";

import { CloseWrapper, Container, Overlay, Root } from "./Popup.styled";

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
                    <Container>
                        {isScreenLarge && (
                            <CloseWrapper onClick={closeProductPopup}>
                                <Close />
                            </CloseWrapper>
                        )}
                        {children}
                    </Container>
                </>
            )}
        </Root>
    );
};

export default ProductPopup;
