import customScroll from "@styles/customScroll.styled";
import { EffectButton } from "@components/ui";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

const opaqueAnimation = keyframes`
    100% {
        opacity: 1;
    }
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
    xl:font-size[23px]`}
`;

export const Content = styled.section<Record<string, unknown>>`
    ${tw`max-w-full  min-height[calc(100vh + 1rem)]
        opacity-0 outline-none order-1
      lg:(width[66%] padding-top[8.5vw] padding-bottom[2.6666666667vw] ml-auto margin-top[-5rem] background-color[#f5f5f5])
      3xl:w-2/3
      4xl:w-3/4`}

    ${customScroll}

    animation: ${opaqueAnimation} 2s cubic-bezier(0.19, 1, 0.22, 1) 1 forwards;
`;

export const HelpCardWrapper = styled.div`
    ${tw`display[none] lg:(block absolute bottom[2.6666666667vw])`}
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
