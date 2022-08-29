import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

const opaqueAnimation = keyframes`
    100% {
        opacity: 1;
    }
`;

export const Root = styled.div`
    ${tw`height[100%] mt-3 opacity-0
    lg:(h-full w-full mt-0 padding-left[2.66667vw] padding-right[2.66667vw])`}

    animation: ${opaqueAnimation} 1.2s cubic-bezier(0.645, 0.045, 0.355, 1) 1 forwards;
`;

export const RootEmpty = styled.div`
    ${tw`flex flex-col items-center justify-center w-full h-full min-height[90vh]
    border-t-2 border-accents-7
    font-family[Whyte Inktrap] text-2xl text-center letter-spacing[-0.03em]
    md:font-size[1.8rem]
    lg:(border-0 font-size[2.7vw])
    2xl:font-size[2.7rem]`}

    & > h1:first-of-type {
        ${tw`mb-3 lg:mb-5`}
    }
`;

export const ContainerEmpty = styled.div<Record<string, unknown>>`
    ${tw`relative w-full h-full
    xl:margin-top[-1.5rem]
    2xl:margin-top[-2.5rem]
    4xl:margin-top[-4.5rem]`}

    ${({ theme }) => theme.layout.mainPadding}
`;

export const BrowsingBtn = styled.button`
    ${tw`flex items-center font-size[1rem]
    md:font-size[1.2rem]
    2xl:font-size[1.3rem]`}

    svg {
        ${tw`fill[rgb(202, 40, 40)] h-5 w-5 mr-1.5
        md:(h-6 w-6)
        2xl:(h-7 w-7)`}

        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1),
            opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    }

    &:hover svg {
        transform: translateX(20%);
    }
`;

export const DecorationOneTop = styled.span`
    ${tw`absolute block top[1rem] right[4vw] 
    height[1.7rem] width[8rem] p-0 bg-accents-9`}

    transform: skewY(-10deg);
`;

export const DecorationOneBottom = styled(DecorationOneTop)`
    ${tw`top[2rem] right[6vw] opacity-70 background-color[rgb(202, 40, 40)]`}
`;

export const DecorationTwoTop = styled.span`
    ${tw`absolute block bottom[1rem] left[4vw] 
    height[1.7rem] width[8rem] p-0 bg-accents-9`}

    transform: skewY(-10deg);
`;

export const DecorationTwoBottom = styled(DecorationTwoTop)`
    ${tw`bottom[2rem] left[6vw] opacity-70 background-color[rgb(202, 40, 40)]`}
`;

///////////////////////////////////////
// Userlist articles
//////////////////////////////////////

export const UserlistFull = styled.article`
    ${tw`flex flex-col`}

    & > h1:first-of-type {
        ${tw`pt-4 pb-10 margin-left[4vw] border-t-2 border-t-secondary 
        font-size[27px] font-family["Whyte Inktrap"] tracking-tighter
        lg:(ml-0 pt-0 border-0 font-size[29px] )
        xl:(font-size[2.25vw])
        2xl:(font-size[33px])`}
    }
`;

export const UserlistBox = styled.ul`
    ${tw`w-full flex justify-between flex-wrap`}/* & > li {
        ${tw`width[calc(50% - 1vw)] margin[1vw 0 10vw]
        lg:(width[calc(50% - 0.75rem)] margin[1vw 0 5.5vw])`}
    } */
`;
