import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

const fontSizeHeader = css`
    ${tw`font-size[25px] leading-normal tracking-tight -mt-1
    lg:(font-size[30px] tracking-tighter)
    2lg:(font-size[2.7vw])`}

    ${tw`2xl:font-size[40px]`}
`;

export const ProductBoutiqueBox = styled.section`
    ${tw`block`}

    header {
        ${tw`mb-8 lg:margin-bottom[50px]`}

        ${({ theme }) => theme.layout.mainPadding}

        h1 {
            ${fontSizeHeader}
        }

        .blinking-dot {
            ${tw`block h-1.5 w-1.5 bg-red margin-top[0.35em] border-radius[50%]
            lg:(h-2 w-2)`}
        }
    }
`;
export const ProductBoutiqueGrid = styled.ul`
    ${({ theme }) => theme.layout.mainPadding}
    ${tw`grid grid-flow-col grid-auto-columns[minmax(90%,1fr)]  
    pt-1 overflow-x-auto column-gap[1.5rem]
    sm:grid-auto-columns[minmax(65%,1fr)]
    md:grid-auto-columns[minmax(50%,1fr)]
    lg:(grid-cols-3 overflow-x-hidden)
    2xl:(grid-cols-3)`}

    & > li {
        ${tw`mb-12`}
    }

    &::-webkit-scrollbar {
        display: none;
    }
`;
