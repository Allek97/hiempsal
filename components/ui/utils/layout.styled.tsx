import { css } from "@emotion/react";
import tw from "twin.macro";

export const mainPadding = css`
    ${tw`padding-left[4vw] padding-right[4vw]
    md:(padding-left[3.75vw] padding-right[3.75vw])
    lg:(padding-left[2.6666666667vw] padding-right[2.6666666667vw])`}
`;
export const mainPaddingLeft = css`
    ${tw`padding-left[4vw] 
    md:padding-left[3.75vw] 
    lg:padding-left[2.6666666667vw]`}
`;
export const mainPaddingRight = css`
    ${tw`padding-right[4vw]
    md:padding-right[3.75vw]
    lg:padding-right[2.6666666667vw]`}
`;
