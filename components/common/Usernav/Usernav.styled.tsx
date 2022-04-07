import customScroll from "@styles/customScroll.styled";
import { EffectButton } from "@components/ui";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import tw, { theme as TwTheme } from "twin.macro";

interface NavBtnProps {
    isSelected: boolean;
    isFirst?: boolean;
    isLast?: boolean;
}

const opaqueAnimation = keyframes`
    100% {
        opacity: 1;
    }
`;

export const Root = styled.main`
    ${tw`block relative overflow-y-auto
    lg:(overflow-visible)`}

    ${customScroll}
`;

export const Navigation = styled.section<Record<string, unknown>>`
    ${tw`padding-top[18px] text-primary bg-primary 
      lg:(absolute -top-20 left-0 height[calc(100% + 5rem)] w-1/3
        bg-accents-2)
      4xl:w-1/4`}

    nav {
        ${tw`flex overflow-hidden lg:(sticky top-0 left-0 flex-col h-screen padding-top[calc(4.5vw + 5rem)])`}

        padding-left: 4vw;
        padding-right: 0vw;

        @media only screen and (min-width: ${TwTheme`screens.md`}) {
            padding-left: 3.75vw;
            padding-right: 3.75vw;
        }
        @media only screen and (min-width: ${TwTheme`screens.lg`}) {
            padding-left: 2.66666666667vw;
            padding-right: 2.66666666667vw;
        }
    }
`;

export const NavBtn = styled(EffectButton)<NavBtnProps>`
    ${tw`lg:(py-4 border-b-2 border-secondary border-solid text-primary)`}

    ${({ theme }) => theme.textSize.textSizeHeader}

    @media only screen and (min-width: ${TwTheme`screens.lg`}) {
        ${({ isFirst }) =>
            isFirst &&
            css`
                ${tw`border-t-2 border-black border-solid`}
            `}
    }

    ${({ isLast }) =>
        !isLast &&
        css`
            padding-right: 10vw;

            ${tw`lg:px-0`}
        `}

    h1 {
        ${tw`text-accents-5 lg:text-primary`}

        ${(props) =>
            props.isSelected &&
            css`
                ${tw`text-primary`}
            `};
    }

    svg {
        ${({ isSelected }) =>
            isSelected
                ? css`
                      ${tw`text-primary`}
                  `
                : css`
                      ${tw`text-accents-5 lg:text-primary`}
                  `};
    }
`;

export const Content = styled.section<Record<string, unknown>>`
    ${tw`max-w-full min-height[calc(100vh - 4rem)] padding-bottom[4vw] opacity-0 bg-primary outline-none
      lg:(width[66%] padding-top[3.5vw] padding-bottom[2.6666666667vw] ml-auto)
      3xl:w-2/3
      4xl:w-3/4`}

    ${({ theme }) => theme.layout.mainPadding}

    ${customScroll}

    animation: ${opaqueAnimation} 2s cubic-bezier(0.19, 1, 0.22, 1) 1 forwards;
`;

export const HelpCardWrapper = styled.div`
    ${tw`absolute bottom[2.6666666667vw]`}
`;

export const ShopPolicy = styled.div`
    ${tw`flex items-center justify-center flex-col
    lg:(absolute bottom[2.5vw] space-x-6 flex-row justify-between)
    3xl:space-x-12`}

    margin-top: 8vw;
    /* margin-bottom: 5rem; */

    ${({ theme }) => theme.textSize.textSizeSmall}

    span {
        margin-bottom: 0.5rem;
    }
`;
