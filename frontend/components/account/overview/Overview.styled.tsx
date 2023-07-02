import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

export const textSizeMain = css`
    ${tw`font-size[28px] line-height[1.2em] tracking-tighter 
    lg:(font-size[30px] line-height[1.5em] letter-spacing[-0.06em])
    2lg:font-size[2.7vw]`}

    ${tw`2xl:font-size[40px]`}
`;

export const Container = styled.div`
    ${tw`relative mb-14 pt-32 pb-28 
    padding-left[16vw] padding-right[16vw] text-center
    md:(padding-left[24vw] padding-right[24vw])
    lg:(padding-left[25%] padding-right[25%] pb-20)`}
`;

export const RootEmpty = styled.div`
    ${tw`flex items-center justify-center w-full h-full 
    lg:(border-0)`}

    h1 {
        ${textSizeMain}
    }
`;
