import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

const paddings = css`
    ${tw`padding[6vw 4vw 20vw]`}
`;

export const Container = styled.div`
    ${tw`flex flex-col items-center`}
    ${paddings}

    h3 {
        ${tw`font-size[11px] lg:font-size[16px]`}
    }
`;

export const CustomerAvatar = styled.div`
    ${tw`flex items-center justify-center height[105px] width[105px] mx-auto
    border-radius[50%] bg-accents-8 text-secondary font-size[28px]
    xl:(height[125px] width[125px])`}
`;

export const PlusCountry = styled.div`
    position: absolute;
    right: 4vw;
    transform: translateY(-50%);
    top: 50%;

    color: #e00b25;
    pointer-events: none;

    svg {
        width: 16px;
        height: 16px;

        fill: #e00b25;
    }
`;
