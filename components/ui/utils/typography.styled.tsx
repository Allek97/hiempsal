import { css } from "@emotion/react";
import tw from "twin.macro";

export const textSizeDefault = css`
    ${tw`font-size[15px] line-height[1.3em] tracking-tighter text-primary
    lg:font-size[13.5px]
    2lg:font-size[1.2vw]
    2xl:font-size[18px]`}
`;

export const textSizeMain1 = css`
    ${textSizeDefault}
    ${tw`line-height[1.1em]
    2xl:font-size[18px]`}
`;

export const textSizeHeader = css`
    ${tw`font-size[26px] line-height[1.1em] tracking-tighter text-primary
    lg:font-size[17.25px]
    2lg:font-size[1.2vw]
    2xl:font-size[23px]`}
`;
