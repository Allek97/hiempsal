import { FC, ReactNode } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Ripples, { RipplesProps } from "react-ripples";
import { useMediaQueryNext } from "@lib/customHooks";

interface Props extends RipplesProps {
    children: ReactNode | ReactNode[];
    isRippleActive?: boolean;
}

interface RippleProps {
    isRippleActive: boolean;
}

const RippleStyle = styled(Ripples)<RippleProps>`
    ${(props) =>
        !props.isRippleActive &&
        css`
            overflow: visible !important;
            & > s {
                height: 0 !important;
                width: 0 !important;
            }
        `}
`;

const Ripple: FC<Props> = ({ children, isRippleActive, ...rest }) => {
    const isScreenLg = useMediaQueryNext("lg");
    return (
        <RippleStyle isRippleActive={isRippleActive ?? !isScreenLg} {...rest}>
            {children}
        </RippleStyle>
    );
};

Ripple.defaultProps = {
    isRippleActive: undefined,
};

export default Ripple;
