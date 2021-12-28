import { Button } from "@components/ui";
import styled from "@emotion/styled";
import tw from "twin.macro";

export const Article = styled.article`
    ${tw`flex h-full w-full mt-4 lg:max-w-4xl text-base overflow-y-auto tracking-tighter`}

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
            ${tw`pb-1 cursor-pointer`}
        }

        p {
            ${tw`text-sm text-accents-7 space-x-3`}
        }
    }
    & > div:nth-of-type(2) {
        ${tw`absolute top-0 right-0 flex flex-col items-end leading-5`}
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
    font-size: 0.9rem;

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
    ${tw`flex justify-between items-center py-6 border-b text-base tracking-tighter`}
`;

export const TotalBox = styled.div`
    ${tw`flex justify-between items-start py-6 text-base leading-5 tracking-tighter`}

    p {
        font-size: 0.7rem;
        font-weight: 500;
        color: var(--accents-7);
        letter-spacing: -0.5px;
    }

    span {
        ${tw`font-semibold`}
    }
`;

export const CheckoutWrapper = styled.div`
    ${tw`flex items-center content-center w-full text-center`}
    margin-top: 6vw;
`;

export const CheckoutButton = styled(Button)`
    font-size: 17px;
`;

export const PaymentVendors = styled.ul`
    ${tw`flex items-center justify-center space-x-2 mt-3.5`}

    svg {
        ${tw`w-6 h-6`}
    }
`;

export const ShopPolicy = styled.div`
    ${tw`flex items-center justify-center flex-col w-full`}

    margin-top: 8vw;
    padding-bottom: 10rem;

    line-height: 1.2em;
    letter-spacing: -0.05em;
    font-size: 12px;

    span {
        margin-bottom: 0.5rem;
    }
`;
