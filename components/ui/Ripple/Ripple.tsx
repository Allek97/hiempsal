import { FC, ReactNode } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Ripples, { RipplesProps } from "react-ripples";
import { useMediaQueryNext } from "@lib/customHooks";
import { transientOptions } from "@lib/transientOptions";

interface Props extends RipplesProps {
    children: ReactNode | ReactNode[];
    isRippleActive?: boolean;
}

interface RippleProps {
    $isRippleActive: boolean;
}

const RippleStyle = styled(Ripples, transientOptions)<RippleProps>`
    ${({ $isRippleActive }) =>
        !$isRippleActive &&
        css`
            @media (hover: hover) and (pointer: fine) {
                overflow: visible !important;
                & > s {
                    height: 0 !important;
                    width: 0 !important;
                }
            }
        `}
`;

const Ripple: FC<Props> = ({
    children,
    isRippleActive = undefined,
    ...rest
}) => {
    const isScreenLg = useMediaQueryNext("lg");
    // console.log(isRippleActive, isScreenLg);
    return (
        <RippleStyle $isRippleActive={isRippleActive ?? !isScreenLg} {...rest}>
            {children}
        </RippleStyle>
    );
};

Ripple.defaultProps = {
    isRippleActive: undefined,
};

export default Ripple;
