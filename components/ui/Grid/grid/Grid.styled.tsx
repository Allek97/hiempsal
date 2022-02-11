import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface Props {
    layout: "clothing" | "technology";
}

const layoutA = css`
    ${tw`grid grid-cols-1
    lg:(grid-cols-2 column-gap[1.5rem] px-11)`}

    & > li {
        ${tw`margin[1vw 0 14vw]
        lg:(margin[1vw 0 5.5vw])`}

        &:last-of-type {
            margin-bottom: 0;
        }

        &:nth-of-type(3n + 3) {
            ${tw`lg:(col-span-2 row-span-2)`}
        }
    }
`;

const layoutB = css`
    ${tw`grid grid-cols-1 padding-left[2.67vw] padding-right[2.67vw]
    md:(grid-cols-2 column-gap[1.5rem])
    lg:(grid-cols-3 px-11)
    2xl:(grid-cols-3)`}

    & > li {
        ${tw`mb-12`}
    }
`;

export const GridRoot = styled.ul<Props>`
    ${(props) => (props.layout === "clothing" ? layoutA : layoutB)}
`;
