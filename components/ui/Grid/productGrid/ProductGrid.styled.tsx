import styled from "@emotion/styled";
import tw from "twin.macro";

export const GridRoot = styled.div`
    ${tw`grid grid-cols-1
    lg:flex flex-wrap justify-between px-8`}

    & > li {
        ${tw`margin[1vw 0 12vw]
        lg:(width[calc(50% - 0.75rem)] margin[1vw 0 5.5vw])`}
    }
`;
