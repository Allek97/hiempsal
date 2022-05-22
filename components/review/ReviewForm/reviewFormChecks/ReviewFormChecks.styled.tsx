import styled from "@emotion/styled";
import tw from "twin.macro";

export const CheckBoxLabel = styled.label`
    ${tw`mr-2.5 mb-3`}
    & > span:first-of-type {
        ${tw`p-0 mr-3`}
    }
    svg {
        ${tw`height[18px] width[18px]`}
    }
`;
