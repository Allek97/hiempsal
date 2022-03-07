import { Button } from "@components/ui";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import tw from "twin.macro";

interface FeatureProps {
    isFirst?: boolean;
}

export const Root = styled.div`
    ${tw`relative padding-bottom[45rem]`}
`;

////////////////////////////////////////////////
// NOTE Product Overview
////////////////////////////////////////////////
export const ProductOverviewContainer = styled.div`
    ${tw`relative grid grid-cols-2 gap-2.5 w-full 
    min-height[auto] px-0
    lg:(grid-template-columns[2fr 1fr] grid-template-rows[34.5% 1fr 34.5%] column-gap[1.3333333333vw] row-gap[0.8vw] pr-11)
    2xl:(grid-template-columns[5fr 2fr])
    3xl:(grid-template-columns[3fr 1fr])`}
`;

export const ImageContainer = styled.div`
    ${tw`relative w-full h-full text-center`}
`;

export const SliderContainer = styled.div`
    ${tw`grid-column[1/-1] flex items-center justify-center 
    w-full height[calc(100vh - 165px)]
    bg-accents-1 overflow-x-hidden
    sm:(height[calc(100vh - 100px)])
    lg:(height[calc(100vh - 82.2px)])`}

    ${tw`lg:(grid-area[1/1/-1/2])`}
`;

export const FeatureContainer = styled.div<FeatureProps>`
    ${tw`relative height[52vw] w-full overflow-hidden
    lg:height[100%]`}

    div {
        ${tw`relative w-full h-full bg-accents-8`}
    }

    ${(props) =>
        props.isFirst
            ? css`
                  ${tw`lg:(grid-area[1/2/2/-1])`}
              `
            : css`
                  ${tw`lg:(grid-area[3/2/-1/-1])`}
              `}
`;

export const CartContainer = styled.div`
    ${tw`flex flex-col grid-column[1/-1] flex-1 
    padding[2vw 4vw 4vw] overflow-hidden`}

    ${tw`lg:(grid-area[2/2/3/-1] p-0)`}
`;

export const ProductInfo = styled.header`
    ${tw`flex flex-col margin-bottom[12vw]
    lg:mb-auto`}

    & > div:first-of-type {
        ${tw`flex flex-row items-center -mb-0.5
        font-size[9.5px] color[#676767] uppercase tracking-tight`}

        span {
            ${tw`leading-none`}
        }
    }

    & > div:nth-of-type(2) {
        ${tw`flex flex-row justify-between items-center 
        font-size[17px] tracking-tight`}

        h1 {
            ${tw`width[60%]`}
        }
    }
`;

export const CertificationBox = styled.div`
    ${tw`flex flex-col mb-1 mt-auto`}

    p {
        ${tw`font-size[10px] color[#676767] pb-1`}
    }

    li {
        ${tw`transition-transform list-none`}

        &:not(:last-of-type) {
            ${tw`mr-1.5`}
        }

        @media (hover: hover) and (pointer: fine) {
            &:hover {
                ${tw`transition-transform`}
                transform : scale(1.1);
            }
        }
    }
`;

export const VariantContainer = styled.div`
    ${tw`flex justify-between items-center height[max-content]`}

    & > div:first-of-type {
        ${tw``}
    }
`;

export const VariantButton = styled(Button)`
    ${tw`height[50px] w-full font-size[15px] text-white tracking-tighter border-radius[3px] 
    lg:(box-shadow[rgb(0 0 0 / 28%) 0.785217px 0.785217px 3.14087px] font-size[18px])`}
`;

export const WishlistBtn = styled.button`
    ${tw`width[20px] margin-left[6vw] mr-3`}
    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
            transform: scale(0.9) translateX(2.5%);
        }
    }
`;

////////////////////////////////////////////////
////////////////////////////////////////////////
