import styled from "@emotion/styled";
import tw from "twin.macro";
import { css } from "@emotion/react";

interface Props {
    variant: "clothing" | "technology";
}

const clothing = css`
    ${tw``}
`;
const technology = css`
    ${tw``}
`;

const variantObj = {
    clothing,
    technology,
};

export const Root = styled.div<Props>`
    ${(props) => variantObj[props.variant]}

    height: 10rem;
    margin: 0 3rem;
`;

export const Container = styled.div`
    ${tw`flex`}

    span {
        ${tw`h-20 w-full`}

        margin: 0 2rem !important;
    }
`;
