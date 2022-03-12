import { css } from "@emotion/react";
import tw from "twin.macro";

export const textSizeDefault = css`
    ${tw`font-size[15px] line-height[1.3em] tracking-tighter 
    lg:font-size[13.5px]
    2lg:font-size[1.2vw]
    2xl:font-size[18px]`}
`;

export const textSizeMain1 = css`
    ${textSizeDefault}
    ${tw`line-height[1.1em]
    2xl:font-size[18px]`}
`;

export const textSizeMedium = css`
    ${tw`font-size[13px] line-height[1em] tracking-tighter 
    lg:(font-size[14px] line-height[1.5em] letter-spacing[-0.06em])
    2lg:font-size[1vw]`}

    ${tw`2xl:font-size[15px]`}
`;

export const textSizeSmall = css`
    ${tw`font-size[11px] line-height[1.2em] letter-spacing[-0.04em] 
    lg:(font-size[11.25px] line-height[1.3em] letter-spacing[-0.05em])
    2lg:font-size[1vw]`}

    ${tw`2xl:font-size[15px]`}
`;

export const textSizeHeader = css`
    ${tw`font-size[26px] line-height[1.1em] letter-spacing[-0.2em] 
        lg:font-size[17.25px]
        2lg:font-size[1.53333333333vw]`}

    ${tw`2xl:font-size[23px]`}
`;
