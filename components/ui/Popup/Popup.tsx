import { FC, MutableRefObject, ReactNode, useRef } from "react";

import { useBodyScroll, useMediaQueryNext } from "@hooks";

import { useUI } from "../context";

import { Container, Overlay, Root } from "./Popup.styled";

interface Props {
    children: ReactNode | ReactNode[];
}

const Popup: FC<Props> = ({ children }) => {
    const {
        isProductCartOpen,
        isProductAdded,
        closePopup,
        closeProductCart,
        setProductNotAdded,
    } = useUI();

    const ref = useRef() as MutableRefObject<HTMLDivElement>;

    const isScreenLarge = useMediaQueryNext("lg");

    useBodyScroll(ref, isProductCartOpen && isProductAdded, !isScreenLarge);

    return (
        <Root ref={ref} data-testid="product-popup">
            <>
                {(isProductCartOpen || isProductAdded) && (
                    <Overlay
                        onClick={() => {
                            setProductNotAdded();
                            closeProductCart();
                            closePopup();
                        }}
                    />
                )}
                <Container>{children}</Container>
            </>
        </Root>
    );
};

export default Popup;
