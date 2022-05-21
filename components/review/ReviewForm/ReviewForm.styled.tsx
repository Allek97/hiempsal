import styled from "@emotion/styled";
import tw from "twin.macro";
import { mainFont } from "../Commun/typography";

export const Container = styled.div`
    ${tw`flex flex-col px-8 mb-28`}
    ${mainFont}

    h2 {
        ${tw`mb-6 font-bold text-accents-8`}
    }
`;
export const FormInput = styled.input`
    ${tw`padding[0.95em 1.1em] mt-0 bg-white `}

    box-shadow: 2px 2px 11px rgb(0 0 0 / 7%);
    border: 1px solid #f0f0f0;

    &:focus {
        outline: none;
    }
`;
export const FormTextArea = styled.textarea`
    ${tw`padding[0.95em 1.1em] mt-0 bg-white h-32`}

    box-shadow: 2px 2px 11px rgb(0 0 0 / 7%);
    border: 1px solid #f0f0f0;

    &:focus {
        outline: none;
    }
`;

export const CheckBoxLabel = styled.label`
    ${tw`mr-2.5 mb-3`}
    & > span:first-of-type {
        ${tw`p-0 mr-3`}
    }
    svg {
        ${tw`height[18px] width[18px]`}
    }
`;
