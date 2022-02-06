import styled from "@emotion/styled";
import tw from "twin.macro";

export const Root = styled.div`
    ${tw`flex flex-col items-center mx-4 mb-40 
    border-radius[2rem] bg-accents-2`}

    background-image: linear-gradient( 
    140deg, 
    rgb(121, 40, 202),
    rgb(121, 255, 225) 100% );
`;

export const ImageWrapper = styled.div`
    ${tw`relative flex justify-center items-center w-full my-12`}

    height: 60vw;

    span {
        ${tw`w-full h-full`}
    }
`;
