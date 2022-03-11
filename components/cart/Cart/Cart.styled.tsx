import { Button, mainPadding } from "@components/ui";
import { keyframes } from "@emotion/react";

import styled from "@emotion/styled";
import tw from "twin.macro";

const opaqueAnimation = keyframes`
    100% {
        opacity: 1;
    }
`;

export const Root = styled.div<any>`
    ${tw`relative flex flex-col min-h-screen opacity-0`}

    ${mainPadding}

    animation: ${opaqueAnimation} 1.2s cubic-bezier(0.645, 0.045, 0.355, 1) 1
        forwards;
`;

export const ItemsHeader = styled.div`
    ${tw`flex font-size[14px] text-accents-7
    xl:(font-size[16px])`}

    & > div:first-of-type {
        ${tw`margin-right[26vw]
        xl:margin-right[28vw]
        2xl:margin-right[26vw]
        4xl:margin-right[30.5rem]`}
    }

    & > div:nth-of-type(2) {
        ${tw`margin-right[5.1vw]
        2xl:margin-right[6.2vw]
        4xl:margin-right[8rem]`}
    }

    & > div:nth-of-type(3) {
        ${tw`margin-right[4.7vw]
        xl:margin-right[4vw]
        2xl:margin-right[7vw]
        4xl:margin-right[8rem]`}
    }

    & > div:nth-of-type(4) {
        ${tw`mr-auto`}
    }
`;

////////////////////////////////////////////////////////
// NOTE: Empty Card
////////////////////////////////////////////////////////
export const EmptyCartRoot = styled.div`
    ${tw`flex flex-col`}
`;

export const EmptyCartBox = styled.div`
    ${tw`flex items-center mt-6 min-height[11.25rem] margin-bottom[1em]
    border-b border-b-accents-5 border-t-2 border-t-secondary
    font-family["Whyte Inktrap"] tracking-tighter
    lg:font-size[20px]`}
`;

export const ShoppingWrapper = styled.div`
    ${tw`w-full ml-auto lg:w-1/2`}

    & > div {
        ${tw`w-full`}
    }
`;

export const ShoppingButton = styled(Button)`
    ${tw`font-size[15px] py-4 text-white tracking-tighter lg:(py-5 font-size[15px])`}
    border: 1px solid rgb(245, 245, 245);
    box-shadow: rgb(0 0 0 / 10%) 1px 1px 3px;
`;

////////////////////////////////////////////////////////
// NOTE: Cart payment and shop policy
////////////////////////////////////////////////////////

export const CartPaymentContainer = styled.div`
    ${tw`lg:(ml-auto w-1/2)`}
`;

export const ShippingBox = styled.div`
    ${tw`flex justify-between items-center py-6 border-b text-base tracking-tighter
    lg:(font-size[16px])
    xl:(font-size[1.25vw])
    2xl:(font-size[1.1vw])
    3xl:(font-size[20px])`}
`;

export const TotalBox = styled.div`
    ${tw`flex justify-between items-start py-6 text-base leading-5 tracking-tighter
    lg:(font-size[16px])
    xl:(font-size[1.25vw])
    2xl:(font-size[1.1vw])
    3xl:(font-size[20px])`}

    p {
        font-size: 0.7rem;
        font-weight: 500;
        color: var(--accents-7);
        letter-spacing: -0.5px;

        ${tw`lg:(margin-top[0.27vw])
        xl:(font-size[1.1vw])
        2xl:(font-size[1.1vw])
        3xl:(font-size[14px])`}
    }

    span {
        font-size: 16px;
        font-weight: 600;

        ${tw`lg:(font-size[16px])
        xl:(font-size[1.25vw])
        2xl:(font-size[1.1vw])
        3xl:(font-size[20px])`}
    }
`;

export const CheckoutWrapper = styled.div`
    ${tw`flex items-center content-center w-full margin-top[6vw] text-center 
    lg:(mt-0)`}
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
    ${tw`flex items-center justify-center flex-col w-full
    lg:(flex-row justify-between margin-top[8vw] w-full font-size[1.15vw])
    xl:(font-size[1vw] w-4/5)
    2xl:(font-size[0.95vw])
    3xl:(font-size[16.5px])`}

    margin-top: 8vw;
    margin-bottom: 5rem;

    line-height: 1.2em;
    letter-spacing: -0.05em;
    font-size: 12px;

    span {
        margin-bottom: 0.5rem;
    }
`;
