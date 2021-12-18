import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw, { theme } from "twin.macro";

interface Props {
    layout: "A" | "B";
}

const layoutA = css`
    & > *:first-of-type {
        @media only screen and (min-width: ${theme`screens.lg`}) {
            ${tw`col-span-2 row-span-2`}
        }
    }
`;

const layoutB = css`
    & > *:nth-of-type(2) {
        @media only screen and (min-width: ${theme`screens.lg`}) {
            ${tw`col-span-2 row-span-2`}
        }
    }
`;

const layoutObj = {
    A: layoutA,
    B: layoutB,
};

export const RootGrid = styled.div<Props>`
    ${tw`grid gap-0 grid-rows-1 grid-cols-1`}

    @media only screen and (min-width: ${theme`screens.lg`}) {
        ${tw`grid-cols-3 grid-rows-2 text-3xl`}
    }

    & > * {
        ${tw`row-span-1 col-span-1 overflow-hidden`}
        max-height: 50rem;

        @media only screen and (min-width: ${theme`screens.lg`}) {
            height: inherit;
            max-height: 100%;
        }
    }

    ${(props) => layoutObj[props.layout]}
`;
