import { css } from "@emotion/react";
import tw from "twin.macro";

export const mainFont = css`
    ${tw`font-size[15px] line-height[1.2em] letter-spacing[-0.04em] 
    lg:(font-size[11.25px] line-height[1.3em] letter-spacing[-0.05em])
    2lg:font-size[1vw]`}

    ${tw`2xl:font-size[15px]`}
`;
export const mainFont2 = css`
    ${mainFont}
    ${tw`font-size[13px]`}
`;
export const mainFont3 = css`
    ${mainFont}
    ${tw`font-size[12px]`}
`;

export const secondaryFont = css`
    ${tw`font-size[10px] line-height[17px] tracking-tighter 
    lg:(font-size[9px] letter-spacing[-0.06em])
    2lg:font-size[0.8vw]`}

    ${tw`2xl:font-size[12px]`}
`;
