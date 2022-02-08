import styled from "@emotion/styled";
import tw from "twin.macro";

export const Root = styled.div`
    ${tw`flex flex-col mx-4 mb-40 p-5
    border-radius[6px] bg-primary`}

    box-shadow:0 2px 7px 2px rgb(0 0 0 / 12%);
`;

export const ImageWrapper = styled.div`
    ${tw`relative flex justify-center items-center w-full my-10 mx-auto`}

    height: 40vw;

    span {
        ${tw`w-full h-full`}
    }
`;

export const DeviceInfo = styled.div`
    ${tw`flex flex-col`}

    h3 {
        ${tw`w-max pb-4 cursor-pointer text-lg color[rgb(0, 118, 206)]`}

        &:hover {
            ${tw`color[#073068]`}
        }
    }

    p {
        ${tw`pb-1 font-size[17px] font-black`}
    }
`;
