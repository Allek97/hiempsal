import { FC, ReactNode } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Ripples from "react-ripples";

interface Props {
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
            & > s {
                height: 0 !important;
                width: 0 !important;
            }
        `}
`;

const Ripple: FC<Props> = ({ children, isRippleActive = true }) => {
    return (
        <RippleStyle isRippleActive={isRippleActive}>{children}</RippleStyle>
    );
};

Ripple.defaultProps = {
    isRippleActive: true,
};

export default Ripple;
