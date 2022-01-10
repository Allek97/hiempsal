import styled from "@emotion/styled";
import tw from "twin.macro";

export const ProductBg = styled.div`
    ${tw`absolute inset-0 z-0`}
    /* background-color: #212529; */

    &:before {
        ${tw`block w-full h-full bg-repeat-space`}
        content: "";
        background-image: url("/product-pattern-bg.svg");
    }
`;

export const ProductImageWrapper = styled.div``;

export const ProductTag = styled.div`
    ${tw`absolute top-0 left-0 z-20`}

    & > * {
        font-size: 2.1rem;
        letter-spacing: 0.4px;
    }
`;

export const ProductName = styled.h3`
    ${tw`font-bold`}
    line-height: 1.65em;

    span {
        ${tw`py-6 px-10 bg-primary`}
        box-decoration-break: clone;
    }
`;
export const ProductPrice = styled.span`
    ${tw`bg-primary pb-4 pt-2 px-6 font-semibold text-sm`}
    letter-spacing: 0.4px;
`;

export const ProductFavorite = styled.button`
    ${tw`absolute top-0 right-0 z-20 p-3 bg-primary`}

    svg {
        ${tw`h-5 w-6`}
    }
`;

export const Root = styled.article`
    ${tw`relative transition duration-500 cursor-pointer`}
    max-height: 100%;

    &:first-of-type {
        ${tw`bg-violet`}
    }
    &:nth-of-type(2) {
        ${tw`bg-accents-9`}
    }
    &:nth-of-type(3) {
        ${tw`bg-pink`}
    }

    ${ProductBg}:before, ${ProductImageWrapper} {
        ${tw`transition-transform duration-500`}
    }

    ${ProductFavorite} {
        ${tw`transition duration-200`}
    }

    &:hover {
        ${ProductBg}:before {
            transform: scale(0.99);
        }

        ${ProductImageWrapper} {
            transform: scale(1.15);
        }

        ${ProductFavorite} {
            ${tw`bg-transparent text-white`}
        }
    }
`;
