import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import { FC } from "react";
import tw from "twin.macro";
import { Rating, RatingProps } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

import { transientOptions } from "@lib/transientOptions";
import { useInView } from "react-intersection-observer";

interface Props extends RatingProps {
    customSize?: "small" | "regular" | "large";
    value: number;
    precision?: number;
    readOnly?: boolean;
}

interface StyleProps {
    $size: "small" | "regular" | "large";
    $isAnimate: boolean;
}

const slideUp = keyframes`
    100% {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const StyledRating = styled(Rating, transientOptions)<StyleProps>`
    ${tw`column-gap[1px] margin-right[2vw] 
    lg:margin-right[0.66666666666667vw]`}

    svg {
        ${({ $size }) =>
            $size === "regular" &&
            css`
                height: 11px;
                width: 11px;
            `}
        ${({ $size }) =>
            $size === "large" &&
            css`
                height: 12px;
                width: 12px;
            `}
        ${({ $size }) =>
            $size === "small" &&
            css`
                height: 9px;
                width: 9px;
            `}
    }

    .MuiRating-iconFilled {
        color: var(--orange-red);
    }
    .MuiRating-iconEmpty {
        color: #cdcdcd;
    }

    & > span {
        ${({ $isAnimate }) =>
            $isAnimate &&
            css`
                opacity: 0;
                transform: translateY(3px);
                animation: ${slideUp} 0.3s ease 1 forwards;

                &:nth-of-type(2) {
                    animation-delay: 0.1s;
                }
                &:nth-of-type(3) {
                    animation-delay: 0.2s;
                }
                &:nth-of-type(4) {
                    animation-delay: 0.3s;
                }
                &:nth-of-type(5) {
                    animation-delay: 0.4s;
                }
            `}
    }
`;

const RatingStyle: FC<Props> = ({
    customSize = "regular",
    value,
    precision,
    readOnly = true,
    ...rest
}) => {
    const { ref: ratingRef, inView: isRatingInView } = useInView({
        threshold: 0.25,
        triggerOnce: true,
    });

    return (
        <StyledRating
            name="customized-color"
            value={value}
            precision={precision}
            icon={<CircleIcon />}
            emptyIcon={<CircleIcon />}
            readOnly={readOnly}
            $size={customSize}
            $isAnimate={isRatingInView}
            ref={ratingRef}
            {...rest}
        />
    );
};

RatingStyle.defaultProps = {
    customSize: "regular",
    precision: 0.1,
    readOnly: true,
};

export default RatingStyle;
