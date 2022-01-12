import customScroll from "@styles/customScroll.styled";
import { EffectButton } from "@components/ui";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw, { theme } from "twin.macro";

interface NavBtnProps {
    isSelected: boolean;
}

export const Root = styled.main`
    ${tw`fixed inset-0 z-40 h-full overflow-hidden overflow-y-auto bg-accents-2`}

    ${customScroll}
`;

export const Container = styled.div`
    ${tw`flex flex-1 flex-col max-w-8xl mx-auto lg:flex-row overflow-hidden`}
`;

export const Navigation = styled.section<Record<string, unknown>>`
    ${tw`font-size[26px] pt-20 text-primary bg-primary
      lg:(width[34%] pt-40 bg-accents-2)`}

    padding-left: 4vw;
    padding-right: 4vw;

    nav {
        ${tw`flex lg:flex-col`}
    }

    @media only screen and (min-width: ${theme`screens.lg`}) {
        padding-left: 2.66666666667vw;
        padding-right: 2.66666666667vw;
    }
`;

export const NavBtn = styled(EffectButton)<NavBtnProps>`
    ${tw`lg:(py-3 border-b-2 border-secondary border-solid font-size[1.25rem] text-primary)
    xl:(font-size[1.6vw] py-4)
    2xl:(font-size[1.27vw])`}

    @media only screen and (min-width: ${theme`screens.lg`}) {
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
    ${tw`max-w-full min-h-screen bg-primary outline-none 
      lg:(width[66%] pt-40)`}
`;
