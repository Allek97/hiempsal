import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import tw from "twin.macro";

interface Props {
    name: string;
}

const flashAnimation = keyframes`
    0% {
        opacity: 1;
    }

    35% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
    65% {
        opacity: 0;
    }
    100% {
        opacity: 0;
    }

`;

export const Root = styled.div`
    ${tw`flex flex-col items-center px-2 py-12 font-family[Whyte Inktrap] overflow-hidden
    sm:(padding-left[2.67vw] padding-right[2.67vw])
    lg:(px-11 py-32)`}

    h1 {
        ${tw`relative mb-12 text-center text-2xl 
        xs:text-3xl`}

        ${tw`md:font-size[35px] 
        lg:(text-4xl)
        2xl:(mb-24 text-5xl)`}
    }
`;
export const Dot = styled.p`
    ${tw`2xl:(absolute bottom-2 right[-1.5rem] h-2 w-2 bg-red border-radius[50%])`}

    animation: ${flashAnimation} 1.25s infinite;
`;

export const PartnerList = styled.ul`
    ${tw`grid grid-cols-1 gap-4 w-full mx-auto 
    max-width[22rem] list-none
    sm:(grid-cols-2 max-width[45rem])
    lg:(grid-cols-3 max-width[none])
    xl:(grid-cols-4 gap-6)`}

    div:first-of-type {
        &:hover {
            position: relative;
            z-index: 30;
        }
    }
`;

const handleImageFit = (name: string) => {
    switch (name) {
        case "adidas":
            return css`
                padding: 2.55rem 2rem !important;
            `;
        case "calvin-klein":
            return css`
                padding: 2.6rem 2rem !important;
            `;
        case "chanel":
            return css`
                padding: 1.4rem 2rem !important;
            `;
        case "gucci":
            return css`
                padding: 2.45rem 2rem !important;
            `;
        case "hermes":
            return css`
                padding: 1.2rem 2rem !important;
            `;
        case "hugo-boss":
            return css`
                padding: 2.25rem 2rem !important;
            `;
        case "lacoste":
            return css`
                padding: 1.5rem 2rem !important;
            `;
        case "lululemon":
            return css`
                padding: 2.2rem 2rem !important;
            `;
        case "nike":
            return css`
                padding: 1.6rem 2rem !important;
            `;
        case "levis":
            return css`
                padding: 2rem 2rem 1.5em !important;
            `;
        case "ralph-lauren":
            return css`
                padding: 1.3rem 2rem !important;
            `;
        case "zalando":
            return css`
                padding: 2.5rem 2rem !important;
            `;

        default:
            return css`
                padding: 1.5rem 2rem !important;
            `;
    }
};

export const PartnerSvgWrapper = styled.li<Props>`
    ${tw`relative height[6.5rem] w-full border-radius[8px] bg-accents-1
    lg:height[7rem]
    3xl:height[7.5rem]`}

    &:hover {
        background-image: linear-gradient(
            140deg,
            rgb(121, 40, 202),
            rgb(121, 255, 225) 100%
        );
    }

    img {
        ${(props) => handleImageFit(props.name)}
    }
`;
