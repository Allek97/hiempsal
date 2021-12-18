import styled from "@emotion/styled";
import tw from "twin.macro";

export const Root = styled.article`
    ${tw`relative`}

    & > div:first-of-type {
        ${tw`flex flex-col`}
    }

    &:first-of-type {
        ${tw`bg-violet`}
    }
    &:nth-of-type(2) {
        ${tw`bg-pink`}
    }
    &:nth-of-type(3) {
        ${tw`bg-cyan`}
    }
`;
export const ProductName = styled.h3`
    ${tw`p-2 text-3xl font-bold bg-white`}
`;
export const ProductPrice = styled.span`
    ${tw``}
`;
