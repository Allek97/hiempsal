import { Button } from "@components/ui";
import styled from "@emotion/styled";
import tw from "twin.macro";

export const ItemsHeader = styled.div`
    ${tw`flex font-size[14px] text-accents-7
    xl:(font-size[16px])`}

    & > div:first-of-type {
        ${tw`margin-right[26vw]
        xl:margin-right[28vw]
        2xl:margin-right[27.5vw]`}
    }

    & > div:nth-of-type(2) {
        ${tw`margin-right[5.1vw]
        2xl:margin-right[6.5vw]`}
    }

    & > div:nth-of-type(3) {
        ${tw`margin-right[4.7vw]
        xl:margin-right[4vw]`}
    }

    & > div:nth-of-type(4) {
        ${tw`mr-auto`}
    }
`;

export const Article = styled.article`
    ${tw`flex h-full w-full mt-4 text-base overflow-y-hidden tracking-tighter
        pt-4 border-t-2 border-t-accents-7`}

    border-bottom: 1px solid var(--accents-2);
`;

export const Separator = styled.hr`
    ${tw`mt-6 bg-secondary`}
    height : 3px;
`;

export const ProductImage = styled.div`
    ${tw`flex justify-center items-center mr-4 
    border-t-8 border-accents-0 cursor-pointer
    lg:width[35%]`}

    width: 70%;
    max-width: 14rem;
`;
export const ProductDetails = styled.div`
    ${tw`relative w-full text-primary 
    lg:(flex justify-between font-size[1.466666666667vw])`}

    & > div:first-of-type {
        ${tw`absolute top-0 left-0 flex flex-col mr-20 
        lg:(static flex-row items-start height[max-content] mr-0 order-1)`}

        h2 {
            ${tw`pb-1 cursor-pointer font-size[17px] line-height[1.15em]
            lg:(width[35%] margin-right[4vw] pb-0)
            xl:(margin-right[6vw] font-size[1.4vw] letter-spacing[-.06em])`}
        }

        p {
            ${tw`text-sm text-accents-7 space-x-3
            lg:(flex justify-between items-center mt-0.5 width[20%] font-size[16px] letter-spacing[-.06em] text-accents-8)
            xl:(font-size[1.25vw])
            2xl:(font-size[1.15vw])`}

            span:first-of-type {
                ${tw`lg:(margin-right[4vw])
                2xl:(margin-right[6vw])`}
            }

            span:nth-of-type(2) {
                ${tw`xl:font-size[1.2vw]
                2xl:(font-size[1.1vw])`}
            }
        }
    }
    & > div:nth-of-type(2) {
        ${tw`absolute top-0 right-0 flex flex-col items-end leading-5 
        lg:(static order-4 mt-2 font-size[16px])
        xl:(font-size[1.25vw])
        2xl:(font-size[1.1vw])`}
    }
    & > div:nth-of-type(3) {
        ${tw`absolute bottom-0 left-0 mb-5 w-full leading-3 cursor-pointer
        lg:(w-max)`}
    }
    & > div:nth-of-type(4) {
        ${tw`absolute bottom-0 right-0 mb-5 cursor-pointer
        lg:(static height[max-content] margin-right[2.5vw] mb-0 mt-1 order-2)`}
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
        font-size: 16px;
        font-weight: 600;
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
