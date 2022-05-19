import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { FC } from "react";
import tw from "twin.macro";
import { Rating } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

import { transientOptions } from "@lib/transientOptions";

interface Props {
    size?: "small" | "regular";
}

interface StyleProps {
    $size: "small" | "regular";
}

export const StyledRating = styled(Rating, transientOptions)<StyleProps>`
    ${tw`column-gap[1px] margin-right[2vw] 
    lg:margin-right[0.66666666666667vw]`}

    svg {
        ${({ $size }) =>
            $size === "regular" &&
            css`
                height: 10px;
                width: 10px;
            `}
        ${({ $size }) =>
            $size === "small" &&
            css`
                height: 8px;
                width: 8px;
            `}
    }

    .MuiRating-iconFilled {
        color: var(--orange-red);
    }
    .MuiRating-iconEmpty {
        color: #cdcdcd;
    }
`;

const RatingStyle: FC<Props> = ({ size = "regular" }) => {
    return (
        <StyledRating
            name="customized-color"
            defaultValue={3.5}
            precision={0.5}
            icon={<CircleIcon />}
            emptyIcon={<CircleIcon />}
            readOnly
            $size={size}
        />
    );
};

RatingStyle.defaultProps = {
    size: "regular",
};

export default RatingStyle;
