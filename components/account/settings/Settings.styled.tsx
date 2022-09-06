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
    ${tw`absolute right[4vw] top-1/2 pointer-events-none
    md:right[2vw]
    lg:right[1.34vw]`}

    transform: translateY(-50%);

    svg {
        width: 16px;
        height: 16px;

        fill: var(--orange-red);
    }
`;

export const CityZipContainer = styled.div`
    ${tw`flex w-full justify-between mb-2`}
    & > div {
        ${tw`width[calc(50% - 1vw)] 
        lg:(width[calc(50% - 0.333vw)])`}
    }
`;

export const PassowrdContainer = styled.div`
    ${tw`flex flex-col w-full justify-between
    sm:flex-row`}
    & > div {
        ${tw`w-full mb-2
        sm:(width[calc(50% - 0.333vw)])`}
    }
`;
