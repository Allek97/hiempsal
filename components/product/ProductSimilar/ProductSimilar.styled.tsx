import { css } from "@emotion/react";
import styled from "@emotion/styled";
import tw from "twin.macro";

const fontSizeHeader = css`
    ${tw`font-family[Whyte Inktrap] font-size[25px] leading-normal tracking-tight text-center -mt-1
        lg:(font-size[30px] tracking-tighter)
        2lg:(font-size[2.7vw])`}

    ${tw`2xl:font-size[42px]`}
`;

export const ProductSimilarBox = styled.section`
    ${tw`block`}

    header {
        ${tw`flex flex-col justify-center items-center mb-8 
        lg:margin-bottom[50px]`}

        h1 {
            ${fontSizeHeader}
        }
    }
`;
