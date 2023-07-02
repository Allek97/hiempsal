import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

const paddings = css`
    ${tw`padding[0 4vw]
    md:padding[0 16vw]
    lg:padding[0 6.7vw]
    xl:padding[0 12vw]`}
`;

export const Container = styled.div`
    ${tw`flex flex-col mb-24
    xl:mb-40`}
    ${paddings}

    h3 {
        ${tw`font-size[11px] lg:font-size[16px]`}
    }
`;

export const CustomerAvatar = styled.div`
    ${tw`flex items-center justify-center height[105px] width[105px] mx-auto
    border-radius[50%] bg-accents-8 uppercase text-secondary font-size[28px]
    xl:(mr-5 height[125px] width[125px])`}
`;

export const PassowrdContainer = styled.div`
    ${tw`flex flex-col w-full justify-between
    sm:flex-row`}
    & > div {
        ${tw`w-full mb-2
        sm:(width[calc(50% - 0.333vw)])`}
    }
`;

export const UtilityButton = styled.button``;
