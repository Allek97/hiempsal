import styled from "@emotion/styled";
import tw, { theme } from "twin.macro";

export const Root = styled.div`
    ${tw`height[90vh] mt-3 lg:(h-full w-full)
    lg:mt-0`}
`;

export const RootEmpty = styled.div`
    ${tw`flex flex-col items-center justify-center w-full h-full
    border-t-2 border-accents-7
    font-family[Whyte Inktrap] text-2xl text-center letter-spacing[-0.03em]
    md:font-size[1.8rem]
    lg:(border-0 font-size[2.7vw])
    2xl:font-size[2.7rem]`}

    h1:first-child {
        ${tw`mb-3 lg:mb-5`}
    }
`;

export const ContainerEmpty = styled.div<Record<string, unknown>>`
    ${tw`relative w-full h-full`}

    padding-left: 4vw;
    padding-right: 4vw;

    @media only screen and (min-width: ${theme`screens.lg`}) {
        padding-left: 2.66666666667vw;
        padding-right: 2.66666666667vw;
    }
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
