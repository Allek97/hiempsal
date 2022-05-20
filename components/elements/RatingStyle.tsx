import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { FC } from "react";
import tw from "twin.macro";
import { Rating } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

import { transientOptions } from "@lib/transientOptions";

interface Props {
    size?: "small" | "regular" | "large";
    value: number;
    precision?: number;
}

interface StyleProps {
    $size: "small" | "regular" | "large";
}

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
`;

const RatingStyle: FC<Props> = ({ size = "regular", value, precision }) => {
    return (
        <StyledRating
            name="customized-color"
            value={value}
            precision={precision}
            icon={<CircleIcon />}
            emptyIcon={<CircleIcon />}
            readOnly
            $size={size}
        />
    );
};

RatingStyle.defaultProps = {
    size: "regular",
    precision: 0.1,
};

export default RatingStyle;
