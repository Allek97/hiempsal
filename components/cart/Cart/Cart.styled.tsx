import styled from "@emotion/styled";
import { css } from "@emotion/react";
import tw from "twin.macro";

import { Button } from "@components/ui";

import { fontSizeSecondary, fontSizeTiny } from "../utils/typography.styled";

const priceTextSize = css`
    ${tw`font-size[15px] line-height[1.3em] tracking-tighter
        lg:(line-height[1.1em] letter-spacing[-0.06em])
        2lg:(font-size[1.333333333333vw])`}

    ${tw`2xl:font-size[20px]`}
`;

export const Root = styled.div`
    ${tw`relative flex flex-col`}

    ${({ theme }) => theme.layout.mainPadding}
`;

export const ItemsHeader = styled.div`
    ${tw`flex text-accents-7 font-size[14px] line-height[1.5em] letter-spacing[-0.06em]`}

    & > div:first-of-type {
        ${tw`width[calc(12vw + 17vw + 1vw)]
        4xl:(width[calc(13.5vw + 17vw + 1vw)])`}
    }

    & > div:nth-of-type(2) {
        ${tw`width[9.1vw]`}
    }

    & > div:nth-of-type(3) {
        ${tw`width[7.75vw]`}
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
    ${tw`lg:(ml-auto w-1/2 margin-bottom[8vw])`}
`;

export const ShippingBox = styled.div`
    ${tw`flex justify-between items-center padding[4vw 0] border-b
    lg:(padding[1.3333333333vw 0])`}
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
    lg:(margin-top[1.6vw])`}
`;

export const CheckoutButton = styled(Button)`
    ${tw`padding[1em]`}

    -webkit-appearance: none !important;
    appearance: none !important;
`;

export const PaymentVendors = styled.ul`
    ${tw`flex items-center justify-center space-x-2 mt-3.5`}

    svg {
        ${tw`w-5 h-5`}
    }
`;
