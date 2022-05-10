import { css } from "@emotion/react";
import tw from "twin.macro";

const titleSize = css`
    ${tw`font-size[20px] tracking-tighter line-height[1.1em]
    lg:(font-size[17.25px] letter-spacing[-0.06em])
    2lg:font-size[1.53333333333333vw]`}

    ${tw`2xl:font-size[23px]`}
`;

const contentSize = css`
    ${tw`font-size[11px] tracking-tighter line-height[1.2em]
    lg:(font-size[11.25px] letter-spacing[-.04em] line-height[1.3em])
    2lg:font-size[1vw]`}

    ${tw`2xl:font-size[15px]`}
`;

export { titleSize, contentSize };
