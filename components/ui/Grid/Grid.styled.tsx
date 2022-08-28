import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface Props {
    layout: "clothing" | "technology" | "userlist";
}

const layoutA = css`
    ${tw`grid grid-cols-1
    lg:(grid-cols-2 column-gap[1.5rem])`}

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
    lg:(grid-cols-3)
    2xl:(grid-cols-3)`}

    & > li {
        ${tw`mb-12`}
    }
`;

const layoutC = css`
    ${tw`grid grid-cols-1
    md:(grid-cols-2 column-gap[1.5rem])
    lg:(grid-cols-3 column-gap[0.8rem])
    3xl:(grid-cols-4)`}

    & > li {
        ${tw`mb-12`}
    }
`;

export const GridRoot = styled.ul<Props>`
    ${(props) => props.layout === "clothing" && layoutA}
    ${(props) => props.layout === "technology" && layoutB}
    ${(props) => props.layout === "userlist" && layoutC}
`;
