import styled from "@emotion/styled";
import tw from "twin.macro";

export const Root = styled.div`
    ${tw`flex items-center content-center bg-primary`}

    padding: 5px 5px;

    box-shadow: 1px 3px 5px rgb(0 0 0 / 2%);

    border: 2px solid #f0f0f0;
    border-radius: 5px;

    span {
        ${tw`text-primary text-center font-normal cursor-pointer font-size[16px]
        3xl:(font-size[17px])`}
    }

    span:first-of-type,
    span:nth-of-type(3) {
        ${tw`flex justify-center items-center h-4 w-4
        hover:bg-accents-1`}
    }

    span:nth-of-type(2) {
        line-height: 1.3em;
        letter-spacing: -0.05em;
        margin: 0 0.5em;
    }
`;
