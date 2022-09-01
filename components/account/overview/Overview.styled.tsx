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

export const DecorationOneTop = styled.span`
    ${tw`absolute block top[1rem] right[4vw] 
    height[1.7rem] width[8rem] bg-accents-9
    lg:(display[none])`}

    transform: skewY(-10deg);
`;

export const DecorationOneBottom = styled(DecorationOneTop)`
    ${tw`top[2rem] right[6vw] opacity-70 background-color[rgb(202, 40, 40)]`}
`;

export const DecorationTwoTop = styled.span`
    ${tw`absolute block bottom[1rem] left[4vw] 
    height[1.7rem] width[8rem] bg-accents-9
    lg:(display[none])`}

    transform: skewY(-10deg);
`;

export const DecorationTwoBottom = styled(DecorationTwoTop)`
    ${tw`bottom[2rem] left[6vw] opacity-70 background-color[rgb(202, 40, 40)]`}
`;

export const RootEmpty = styled.div`
    ${tw`flex items-center justify-center w-full h-full 
    lg:(border-0)`}

    h2 {
        ${textSizeMain}
    }
`;

export const BrowsingBtn = styled.button`
    span {
        ${tw`flex items-center ml-1.5 text-orange-red`}
    }

    svg {
        ${tw`fill[var(--orange-red)] h-5 w-5 mr-1.5
            md:(h-6 w-6)
            2xl:(h-7 w-7)`}

        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1),
                opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    }

    &:hover svg {
        transform: translateX(20%);
    }

    ${textSizeMain}
`;
