import { css } from "@emotion/react";
import tw from "twin.macro";

// NOTE #__next
export const textSizeDefault = css`
    ${tw`font-size[15px] line-height[1.3em] tracking-tighter 
    lg:font-size[13.5px]
    2lg:font-size[1.2vw]`}

    ${tw`2xl:font-size[18px]`}
`;

// NOTE Hero(HeroBtn)
export const textSizeMain = css`
    ${textSizeDefault}
    ${tw`font-size[13px]
    lg:letter-spacing[-0.06em]`}
`;

export const textSizeLarge = css`
    ${tw`font-size[17px] line-height[1em] tracking-tighter 
    lg:(font-size[16.5px] line-height[1.5em] letter-spacing[-0.06em])
    2lg:font-size[1.47vw]`}

    ${tw`2xl:font-size[22px]`}
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

// NOTE Uernav(Navbtn)
export const textSizeHeader = css`
    ${tw`font-size[26px] line-height[1.1em] letter-spacing[-0.02em] 
        lg:font-size[17.25px]
        2lg:font-size[1.53333333333vw]`}

    ${tw`2xl:font-size[23px]`}
`;
