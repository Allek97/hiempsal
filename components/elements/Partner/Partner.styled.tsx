import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

interface Props {
    name: string;
}

export const Root = styled.div`
    ${tw`flex flex-col items-center font-family[Whyte Inktrap]`}
`;
export const Dot = styled.p`
    ${tw`absolute bottom-2 -right-3 h-2 w-2 bg-red border-radius[50%]`}
`;

export const PartnerList = styled.ul`
    ${tw`grid grid-cols-1 gap-4 w-full mb-24 mx-auto 
    max-width[22rem] px-2 list-none
    sm:(grid-cols-2 max-width[45rem] padding-left[2.67vw] padding-right[2.67vw])
    lg:(grid-cols-4 px-11 max-width[90rem])`}
`;

const handleImageFit = (name: string) => {
    switch (name) {
        case "adidas":
            return css`
                padding: 1.95rem 2rem !important;
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
    lg:height[7rem]`}

    img {
        ${(props) => handleImageFit(props.name)}
    }
`;
