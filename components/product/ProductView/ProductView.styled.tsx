import styled from "@emotion/styled";
import tw from "twin.macro";

export const Root = styled.div`
    ${tw`relative flex flex-col w-full min-height[auto]
    lg:(flex-row pr-11)`}
`;

export const SliderContainer = styled.div`
    ${tw`flex items-center justify-center w-full max-w-7xl height[82vh] mr-6
    bg-accents-1 overflow-x-hidden`}
    max-height: 775px;
`;

export const ImageContainer = styled.div`
    ${tw`relative w-full h-full text-center`}
`;

export const CartContainer = styled.div`
    ${tw`flex flex-col justify-between items-start flex-1
    overflow-hidden`}
`;

export const CartButton = styled.button`
    ${tw`block py-3.5 background-color[#0076ce] border-radius[3px]
    font-size[16px] text-center leading-3 cursor-pointer text-secondary`}

    &:hover {
        ${tw`background-color[#00447c]`}
    }
`;
