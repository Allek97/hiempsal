import styled from "@emotion/styled";

import tw from "twin.macro";

export const Root = styled.div`
    ${tw`relative`}
`;

export const ProductOverviewContainer = styled.div`
    ${tw`relative flex flex-col w-full min-height[auto]
    lg:(flex-row pr-11)`}
`;

export const SliderContainer = styled.div`
    ${tw`flex items-center justify-center w-full height[calc(100vh - 165px)] max-w-7xl mr-6
    bg-accents-1 overflow-x-hidden
    lg:(height[calc(100vh - 82px)])`}
`;

export const ImageContainer = styled.div`
    ${tw`relative w-full h-full text-center`}
`;

export const CartContainer = styled.div`
    ${tw`flex flex-col items-start flex-1
    overflow-hidden`}
`;

export const CertificationBox = styled.div`
    ${tw`flex`}

    div {
        &:not(:last-of-type) {
            ${tw`mr-0.5`}
        }
    }
`;

export const CartButton = styled.button`
    ${tw`block py-3.5 mr-2 background-color[#0076ce] border-radius[3px]
    font-size[16px] text-center leading-3 cursor-pointer text-secondary`}

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            ${tw`background-color[#00447c]`}
        }
    }
`;

export const WishlistBtn = styled.button`
    ${tw`width[18.5px]`}
    @media (hover: hover) and (pointer: fine) {
        &:hover {
            transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
            transform: scale(0.9) translateX(2.5%);
        }
    }
`;
