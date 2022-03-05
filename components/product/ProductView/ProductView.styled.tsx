import { Button } from "@components/ui";
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
    lg:(height[calc(100vh - 100px)])`}
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

    a {
        ${tw`transition-transform`}

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

export const VariantButton = styled(Button)`
    ${tw`height[50px] w-full mr-2 font-size[15px] text-white tracking-tighter border-radius[3px] lg:(font-size[18px])`}

    box-shadow: rgb(0 0 0 / 28%) 0.785217px 0.785217px 3.14087px;
`;

export const WishlistBtn = styled.button`
    ${tw`width[22px]`}
    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
            transform: scale(0.9) translateX(2.5%);
        }
    }
`;
