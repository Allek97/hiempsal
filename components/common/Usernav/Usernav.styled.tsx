import customScroll from "@styles/customScroll.styled";
import { EffectButton } from "@components/ui";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import tw, { theme as TwTheme } from "twin.macro";

interface NavBtnProps {
    isSelected: boolean;
}

const opaqueAnimation = keyframes`
    100% {
        opacity: 1;
    }
`;

export const Root = styled.main`
    ${tw`fixed inset-0 z-40 h-full bg-white overflow-y-auto
    lg:(overflow-visible)`}

    ${customScroll}
`;

export const Container = styled.div`
    ${tw`flex flex-1 flex-col h-full mx-auto lg:flex-row`}
`;

export const Navigation = styled.section<Record<string, unknown>>`
    ${tw`padding-top[72.5px] text-primary bg-primary 
      lg:(sticky top-0 left-0 w-1/3 padding-top[9.55vw] bg-accents-2)
      4xl:w-1/4`}

    padding-left: 4vw;
    padding-right: 0vw;

    nav {
        ${tw`flex overflow-hidden lg:flex-col`}
    }

    @media only screen and (min-width: ${TwTheme`screens.md`}) {
        padding-left: 3.75vw;
        padding-right: 3.75vw;
    }
    @media only screen and (min-width: ${TwTheme`screens.lg`}) {
        padding-left: 2.66666666667vw;
        padding-right: 2.66666666667vw;
    }
`;

export const NavBtn = styled(EffectButton)<NavBtnProps>`
    ${tw`lg:(py-4 border-b-2 border-secondary border-solid text-primary)`}

    ${({ theme }) => theme.textSize.textSizeHeader}

    @media only screen and (min-width: ${TwTheme`screens.lg`}) {
        &:first-of-type {
            ${tw`border-t-2 border-black border-solid`}
        }
    }

    &:not(:last-child) {
        padding-right: 10vw;

        ${tw`lg:px-0`}
    }

    h1 {
        ${tw`text-accents-5 lg:text-primary`}

        ${(props) =>
            props.isSelected &&
            css`
                ${tw`text-primary`}
            `};
    }

    svg {
        ${(props) =>
            props.isSelected
                ? css`
                      ${tw`text-primary`}
                  `
                : css`
                      ${tw`text-accents-5 lg:text-primary`}
                  `};
    }
`;

export const Content = styled.section<Record<string, unknown>>`
    ${tw`max-w-full opacity-0 bg-primary outline-none
      lg:(overflow-y-auto width[66%] padding-top[7.5vw])
      3xl:w-2/3
      4xl:w-3/4`}

    ${customScroll}

    animation: ${opaqueAnimation} 2s cubic-bezier(0.19, 1, 0.22, 1) 1 forwards;
`;

export const HelpCardWrapper = styled.div`
    ${tw`fixed bottom[2.6666666667vw]`}
`;
