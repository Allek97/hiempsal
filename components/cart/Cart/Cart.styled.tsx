import { Button } from "@components/ui";
import { css, keyframes } from "@emotion/react";

import styled from "@emotion/styled";
import tw from "twin.macro";
import { fontSizeSecondary, fontSizeTiny } from "../utils/typography.styled";

const opaqueAnimation = keyframes`
    100% {
        opacity: 1;
    }
`;

const priceTextSize = css`
    ${tw`font-size[15px] line-height[1.3em] tracking-tighter
        lg:(line-height[1.1em] letter-spacing[-0.06em])
        2lg:(font-size[1.333333333333vw])`}

    ${tw`2xl:font-size[20px]`}
`;

export const Root = styled.div`
    ${tw`relative flex flex-col padding-bottom[4vw] min-height[calc(100vh - 7.5vw)] opacity-0
    lg:padding-bottom[2.6666666667vw]`}

    ${({ theme }) => theme.layout.mainPadding}

    animation: ${opaqueAnimation} 1.2s cubic-bezier(0.645, 0.045, 0.355, 1) 1
        forwards;
`;

export const ItemsHeader = styled.div`
    ${tw`flex text-accents-7 font-size[13px] line-height[1em] tracking-tighter 
    lg:(font-size[14px] line-height[1.5em] letter-spacing[-0.06em])`}

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
    line-height[1.3em]
    lg:(margin-top[1vw])`}
`;

export const ShoppingWrapper = styled.div`
    ${tw`w-full ml-auto lg:w-1/2`}

    & > div {
        ${tw`w-full`}
    }
`;

export const ShoppingButton = styled(Button)`
    ${tw`font-size[16px] py-4 text-white tracking-tighter
    lg:line-height[1.5em]`}
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
    ${tw`flex justify-between items-center padding[4vw 0] border-b`}
    ${fontSizeSecondary}
`;

export const TotalBox = styled.div`
    ${tw`flex justify-between items-start padding-top[1em]`}
    ${fontSizeSecondary}

    p {
        ${tw`text-accents-7 margin-top[0.8vw] lg:(margin-top[0.27vw])`}

        ${fontSizeTiny}
    }

    span {
        font-weight: 600;
        ${priceTextSize}
    }
`;

export const CheckoutWrapper = styled.div`
    ${tw`flex items-center content-center w-full margin-top[6vw] text-center 
    lg:(mt-0)`}
`;

export const CheckoutButton = styled(Button)`
    ${tw`padding[1em]`}
`;

export const PaymentVendors = styled.ul`
    ${tw`flex items-center justify-center space-x-2 mt-3.5`}

    svg {
        ${tw`w-6 h-6`}
    }
`;

export const ShopPolicy = styled.div`
    ${tw`flex items-center justify-center flex-col w-full
    lg:(flex-row justify-between w-full mt-auto)
    xl:w-4/5`}

    margin-top: 8vw;
    /* margin-bottom: 5rem; */

    ${({ theme }) => theme.textSize.textSizeSmall}

    span {
        margin-bottom: 0.5rem;
    }
`;
