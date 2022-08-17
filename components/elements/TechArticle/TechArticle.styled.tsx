import styled from "@emotion/styled";
import tw from "twin.macro";

interface ColorProps {
    color?: string;
}

export const Root = styled.li`
    ${tw`flex flex-col px-4 pb-6
    border-radius[6px] bg-primary`}

    box-shadow:0 2px 7px 2px rgb(0 0 0 / 12%);
`;

export const ImageWrapper = styled.div`
    ${tw`relative flex justify-center items-center w-full height[56vw] mx-auto
    sm:(height[45vw])
    md:(height[28vw])
    lg:(height[21vw])
    2xl:(height[21.5rem])`}

    span {
        ${tw`w-full h-full`}
    }
`;

export const DeviceInfo = styled.div`
    ${tw`flex flex-col w-max`}

    h3 {
        ${tw`w-max pb-1.5 cursor-pointer text-lg color[rgb(0, 118, 206)] tracking-tight`}

        &:hover {
            ${tw`color[#073068]`}
        }
    }

    p {
        ${tw`font-size[17px] font-black`}
    }
`;

export const ReviewWrapper = styled.div`
    ${tw`flex mb-5 border-b border-b-transparent space-x-1 font-size[13.5px] tracking-tighter cursor-pointer`}

    & > span:first-of-type {
        color: #006bbd !important;
        font-size: 1.2rem;
    }

    &:hover {
        ${tw`border-color[#00447c]`}
        & > span {
            color: #00447c !important;
        }
    }
`;

export const DeviceSpecs = styled.ul`
    ${tw`flex flex-col space-y-2 my-5 text-sm list-none`}

    li {
        ${tw`flex items-center`}

        svg {
            ${tw`font-size[19px] mr-2.5`}
        }
    }
`;

export const Color = styled.span<ColorProps>`
    ${tw`height[18px] width[18px] border border-accents-6 border-radius[20%]`}

    background-color:  ${(props) => (props.color ? props.color : "#c5c5c5")};
`;

export const DeviceButton = styled.button`
    ${tw`block py-3.5 background-color[#0076ce] border-radius[3px]
    font-size[16px] text-center leading-3 cursor-pointer text-secondary`}

    &:hover {
        ${tw`background-color[#00447c]`}
    }
`;
