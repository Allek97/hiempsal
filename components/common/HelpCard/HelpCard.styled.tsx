import styled from "@emotion/styled";
import tw from "twin.macro";

export const HelpCardBox = styled.div`
    ${tw`flex items-center transition 
    font-size[14.5px] cursor-pointer`}

    div:nth-of-type(2) {
        ${tw`flex flex-col leading-6`}

        span {
            ${tw`w-max`}
        }

        span:nth-of-type(2) {
            ${tw`text-accents-6 text-xs`}
        }
    }

    &:hover div:nth-of-type(2) {
        span:first-of-type {
            ${tw`transition`}
            transform: skewX(-10deg);
        }
    }
`;
export const HelpCardImage = styled.div`
    ${tw`h-11 w-11`}

    margin-right: 0.8vw;
    border-radius: 50%;
    filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.15));
    overflow: hidden;
`;
