import styled from "@emotion/styled";
import tw from "twin.macro";

export const ReviewField = styled.div`
    ${tw`flex`}

    span {
        line-height: 17px !important;
    }

    span:first-of-type {
        ${tw`text-accents-8 font-bold margin-right[0.3em]`}
    }

    &:not(:last-of-type) {
        ${tw`mb-1`}
    }
`;
