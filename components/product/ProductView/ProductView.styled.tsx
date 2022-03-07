import { Button } from "@components/ui";
import styled from "@emotion/styled";

import tw from "twin.macro";

export const Root = styled.div`
    ${tw`relative padding-bottom[45rem]`}
`;

////////////////////////////////////////////////
// NOTE Product Overview
////////////////////////////////////////////////
export const ProductOverviewContainer = styled.div`
    ${tw`relative grid grid-cols-1 gap-2.5 w-full 
    min-height[auto] px-0
    lg:(grid-cols-2 grid-rows-3 pr-11 )`}
`;

export const ImageContainer = styled.div`
    ${tw`relative w-full h-full text-center`}
`;

export const SliderContainer = styled.div`
    ${tw`flex items-center justify-center w-full height[calc(100vh - 165px)] max-w-7xl mr-6
    bg-accents-1 overflow-x-hidden
    lg:(grid-area[1/1/-1/2] height[calc(100vh - 100px)])`}
`;

export const FeatureContainer = styled.div`
    ${tw`relative flex gap-x-2 h-full w-full
    overflow-hidden 
    lg:(grid-area[1/2/3/-1])`}

    div {
        ${tw`w-full h-full bg-accents-8`}
    }
`;

export const CartContainer = styled.div`
    ${tw`grid grid-cols-1 flex-1 
    padding[2vw 4vw 4vw] overflow-hidden
    lg:(grid-area[3/2/-1/-1])`}
`;

export const ProductInfo = styled.header`
    ${tw`flex flex-col margin-bottom[12vw]`}

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
    ${tw`flex flex-col mb-1`}

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
    ${tw`flex justify-between items-center`}

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
