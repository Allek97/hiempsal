import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface Props {
    layout: "clothing" | "technology";
}

const layoutA = css`
    ${tw`grid grid-cols-1
    lg:(grid-cols-2 column-gap[1.5rem])`}

    @media (max-width: 1023px) {
        padding-left: 0 !important;
        padding-right: 0 !important;
    }

    & > li {
        ${tw`margin[0 0 15vw]
        lg:(margin[0 0 6.5vw])`}

        &:last-of-type {
            margin-bottom: 0;
        }

        &:nth-of-type(3n + 3) {
            ${tw`lg:(col-span-2 row-span-2)`}
        }
    }
`;

const layoutB = css`
    ${tw`grid grid-cols-1
    md:(grid-cols-2 column-gap[1.5rem])
    lg:(grid-cols-3 px-11)
    2xl:(grid-cols-3)`}

    & > li {
        ${tw`mb-12`}
    }
`;

export const GridRoot = styled.ul<Props>`
    ${({ theme }) => theme.layout.mainPadding}
    ${(props) => (props.layout === "clothing" ? layoutA : layoutB)}
`;
