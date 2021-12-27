import styled from "@emotion/styled";
import tw from "twin.macro";

export const Article = styled.article`
    ${tw`flex h-full w-full mt-4 lg:max-w-4xl text-base overflow-y-auto`}

    border-bottom: 1px solid var(--accents-2);
`;

export const ProductImage = styled.div`
    ${tw`flex justify-center items-center mr-4 
    border-t-8 border-accents-0 cursor-pointer`}

    width: 70%;
    max-width: 14rem;
`;
export const ProductDetails = styled.div`
    ${tw`relative w-full text-primary`}

    & > div:first-of-type {
        ${tw`absolute top-0 left-0 flex flex-col mr-20`}

        h2 {
            ${tw`pb-1 font-medium cursor-pointer`}
        }

        p {
            ${tw`text-sm text-accents-6 font-normal space-x-3`}
        }
    }
    & > div:nth-of-type(2) {
        ${tw`absolute top-0 right-0 flex flex-col items-end text-sm font-medium`}
    }
    & > div:nth-of-type(3) {
        ${tw`absolute bottom-0 left-0 mb-5 w-full leading-3 cursor-pointer`}
    }
    & > div:nth-of-type(4) {
        ${tw`absolute bottom-0 right-0 mb-5 cursor-pointer`}
    }
`;

export const RemoveBtn = styled.button`
    ${tw`flex items-center justify-center transition-opacity text-red 
        font-medium opacity-80 hover:opacity-100`}
    letter-spacing: -.05em;
    font-size: 1rem;

    svg {
        ${tw`mr-1`}
    }

    &:after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        height: 1px;
        width: 100%;
        background: #e00b25;
        transition: transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
        transform: scaleX(0);
        transform-origin: 100% 100%;
    }

    &:hover:after {
        transform: scaleX(1);
        transform-origin: 0;
    }
`;

export const ShippingBox = styled.div`
    ${tw`flex justify-between items-center py-8 border-b font-semibold text-base`}
`;

export const TotalBox = styled.div`
    ${tw`flex justify-between items-start py-8 font-semibold text-base`}

    span {
        font-size: 0.625rem;
        font-weight: 500;
        color: var(--accents-7);
    }
`;
