import { css } from "@emotion/react";
import tw from "twin.macro";

export const fontSizeMain = css`
    ${tw`font-size[15px] line-height[1.3em] tracking-tighter
        lg:(font-size[16.5px] line-height[1em] letter-spacing[-0.06em])
        2lg:(font-size[1.4666667vw])`}

    ${tw`2xl:font-size[22px]`}
`;
export const fontSizeSecondary = css`
    ${tw`font-size[15px] line-height[1.3em] tracking-tighter
        lg:(font-size[13.5px] line-height[1em] letter-spacing[-0.06em])
        2lg:(font-size[1.2vw])`}

    ${tw`2xl:font-size[18px]`}
`;
export const fontSizeTertiary = css`
    ${fontSizeSecondary}
    ${tw`font-size[13px]`}
`;
export const fontSizeTiny = css`
    ${tw`font-size[10px] line-height[1] tracking-tighter
        lg:(font-size[9px] line-height[1.2em])
        2lg:(font-size[0.8vw])`}

    ${tw`2xl:font-size[12px]`}
`;
