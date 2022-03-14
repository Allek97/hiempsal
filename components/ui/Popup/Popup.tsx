import { FC, MutableRefObject, ReactNode, useRef } from "react";

import { useProductUI } from "@components/ui/productContext";
import { useBodyScroll, useMediaQueryNext } from "lib/customHooks";

import Close from "@components/icons/Close";

import { CloseWrapper, Container, Overlay, Root } from "./Popup.styled";

interface Props {
    children: ReactNode | ReactNode[];
}

const ProductPopup: FC<Props> = ({ children }) => {
    const { closeProductPopup, isProductPopupOpen } = useProductUI();

    const ref = useRef() as MutableRefObject<HTMLDivElement>;

    const isScreenLarge = useMediaQueryNext("lg");

    useBodyScroll(ref, isProductPopupOpen, !isScreenLarge);

    return (
        <Root ref={ref}>
            {isProductPopupOpen && (
                <>
                    <Overlay onClick={closeProductPopup} />
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
