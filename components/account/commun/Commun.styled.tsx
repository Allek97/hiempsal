import customScroll from "@styles/customScroll.styled";
import { EffectButton } from "@components/ui";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

const opaqueAnimation = keyframes`
    100% {
        opacity: 1;
    }
`;

export const textSizeMain = css`
    ${tw`font-size[28px] line-height[1.2em] tracking-tighter 
    lg:(font-size[30px] line-height[1.5em] letter-spacing[-0.06em])
    2lg:font-size[2.7vw]`}

    ${tw`2xl:font-size[40px]`}
`;

export const Root = styled.main`
    ${tw`relative flex flex-col overflow-y-auto
    lg:(block overflow-visible)`}

    ${customScroll}
`;

export const Navigation = styled.section<Record<string, unknown>>`
    ${tw`text-primary bg-primary mb-16 order-2
      lg:(absolute -top-20 left-0 height[calc(100% + 5rem)] w-1/3 mb-28)
      4xl:w-1/4`}

    nav {
        ${tw`flex flex-col overflow-hidden`}
        ${tw`lg:(sticky top-0 left-0 flex-col h-screen 
            padding-top[calc(4.5vw + 5rem)])`}

        ${({ theme }) => theme.layout.mainPadding}
    }
`;

export const WrapperMedia = styled.div`
    ${tw`display[none] lg:(block w-full)`}
`;

export const NavBtn = styled(EffectButton)`
    ${tw`padding-top[15px] padding-bottom[15px] border-b-2 border-color[#cdcdcd] 
    border-solid text-primary font-size[19px]
    lg:(padding-top[18px] padding-bottom[18px] 
        border-color[#999999])
    xl:font-size[21px]
    3xl:font-size[23px]`}
`;

export const Content = styled.section<Record<string, unknown>>`
    ${tw`flex flex-col justify-between max-w-full opacity-0 outline-none order-1
      lg:(width[66%] min-height[calc(100vh + 1rem)] padding-top[8.5vw] 
      padding-bottom[2.6666666667vw] ml-auto 
      margin-top[-5rem] background-color[#f5f5f5])
      3xl:w-2/3
      4xl:w-3/4`}

    ${customScroll}

    animation: ${opaqueAnimation} 2s cubic-bezier(0.19, 1, 0.22, 1) 1 forwards;
`;
export const AdvertisementBoxIn = styled.div`
    ${tw`display[none] lg:(block order-3)`}
`;
export const AdvertisementBoxOut = styled.div`
    ${tw`order-3 mb-10 lg:display[none]`}
`;

export const HelpCardWrapper = styled.div`
    ${tw`block mt-10 lg:(absolute bottom[2.6666666667vw])`}
`;

export const ShopPolicy = styled.div`
    ${tw`flex items-center justify-center flex-col
    lg:(absolute bottom[2.5vw] space-x-6 flex-row justify-between)
    3xl:space-x-12`}

    margin-top: 8vw;
    /* margin-bottom: 5rem; */

    ${({ theme }) => theme.textSize.textSizeSmall}

    span {
        margin-bottom: 0.5rem;
    }
`;
// Empty Userlist

export const BrowsingBtn = styled.button`
    span {
        ${tw`flex items-center ml-1.5 text-orange-red`}
    }

    svg {
        ${tw`fill[var(--orange-red)] h-5 w-5 mr-1.5
            md:(h-6 w-6)
            2xl:(h-7 w-7)`}

        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1),
                opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    }

    &:hover svg {
        transform: translateX(20%);
    }

    ${textSizeMain}
`;

export const DecorationOneTop = styled.span`
    ${tw`absolute block top[1rem] right[4vw] 
    height[1.7rem] width[8rem] bg-accents-9
    lg:(display[none])`}

    transform: skewY(-10deg);
`;

export const DecorationOneBottom = styled(DecorationOneTop)`
    ${tw`top[2rem] right[6vw] opacity-70 background-color[rgb(202, 40, 40)]`}
`;

export const DecorationTwoTop = styled.span`
    ${tw`absolute block bottom[1rem] left[4vw] 
    height[1.7rem] width[8rem] bg-accents-9
    lg:(display[none])`}

    transform: skewY(-10deg);
`;

export const DecorationTwoBottom = styled(DecorationTwoTop)`
    ${tw`bottom[2rem] left[6vw] opacity-70 background-color[rgb(202, 40, 40)]`}
`;

export const QuantityIndicator = styled.div`
    ${tw`absolute -top-3.5 -right-3.5 z-20 flex items-center justify-center
    w-7 h-7 bg-accents-5 border-radius[50%] 
    font-size[12px] text-white`}
`;
