import styled from "@emotion/styled";
import tw from "twin.macro";

export const GridRoot = styled.div`
    ${tw`grid grid-cols-1
    lg:(grid grid-cols-2 content-center px-12)`}

    & > li {
        ${tw`margin[1vw 0 14vw]
        lg:(width[calc(100% - 1.5rem)] margin[1vw 0 5.5vw])`}

        &:last-of-type {
            margin-bottom: 0;
        }

        &:nth-of-type(3n + 3) {
            ${tw`lg:(col-span-2 row-span-2)`}
        }
    }
`;
